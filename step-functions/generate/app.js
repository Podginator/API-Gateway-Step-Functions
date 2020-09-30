const AWS = require('aws-sdk');
const bwipjs = require('bwip-js');

const s3 = new AWS.S3();

const getBarcodeImage = (text) => { 
    return new Promise((resolve, reject) => { 
        bwipjs.toBuffer({
            bcid:        'code128',       
            text,       
            scale:       3,               
            height:      10,              
            includetext: true,            
            textxalign:  'center',        
        }, (err, png) => { 
            if (err) { 
                return reject(err)
            }
            resolve(png)
        })
    });
};

exports.handler = async (event, context, callback) => {
    const { text, clientId } = event

    const barcodeImage = await getBarcodeImage(text + clientId);
    await s3.putObject({ 
        Bucket: process.env.S3_BUCKET,
        Key: `${clientId}_pdf.png`,
        ACL: 'public-read',
        Body: barcodeImage
    }).promise() 

    callback(null, { clientId, url: `https://${process.env.S3_BUCKET}.s3.amazonaws.com/${clientId}_pdf.png` });
};