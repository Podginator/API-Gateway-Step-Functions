const AWS = require('aws-sdk');
const JsBarcode = require('jsbarcode');
const { jsPDF } = require("jspdf");
const { Canvas } = require("canvas");

const s3 = new AWS.s3();

exports.handler = async (event, context, callback) => {
    const { text, clientId } = event
    const canvas = new Canvas();
    const document = new jsPDF();
    JsBarcode(canvas, text)

    const image = canvas.toDataURL("image/jpeg", 1.0);
    document.addImage(image, 'JPEG', 0, 0);
    await document.save(`${text}_pdf`, { returnPromise: true })
    const fileBuffer = fs.readFileSync(`${text}_pdf`);

    await s3.putObject({ 
        Bucket: process.env.S3_BUCKET,
        Key: `${clientId}_pdf.pdf`,
        ACL: 'public-read',
        Body: fileBuffer
    }).promise() 

    callback(null, { clientId, url: `https://${process.env.S3_BUCKET}.s3.amazonaws.com/${clientId}_pdf.pdf` });
};
