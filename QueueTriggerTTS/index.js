import { TextToSpeech } from require("cognitive-tools");
import { Blob } from require('azure-storage-as-promised');

module.exports = async function (context, myQueueItem) {

    try{

        context.log(`JavaScript queue trigger function processed work item = \'${myQueueItem}\' ${(+new Date).toString()}`);
    
        const ttsConfig = {
            accessTokenHost: process.env.SPEECHACCESSTOKENHOST,
            ttsHost: process.env.SPEECHRESOURCETTSHOST,
            ttsKey: process.env.SPEECHRESOURCETTSKEY
        };
            
        const textToSpeech = new TextToSpeech(ttsConfig);


        for (const translation of myQueueItem.translations) {
            context.log(JSON.stringify(translation));
        }

/*
        const transformConfig = {
            filenameandpath: 'test.mp3'
        }

        let writableStream = fs.createWriteStream(transformConfig.filenameandpath);
        await textToSpeech.transform(transformConfig, "This is a brand new world.", writableStream);

        //stream handling
        writableStream.end();

        await fsPromises.access(transformConfig.filenameandpath, fs.constants.W_OK);

        // cleanup
        await fsPromises.unlink(transformConfig.filenameandpath);        

        context.bindings.outputQueueItem = {
            'detectedLanguages':  myQueueItem.detectedLanguages,
            'text': myQueueItem.text,
            'toLanguages': myQueueItem.toLanguages,
            'translations': response[0].translations
        };        
        */
        
    }catch(err){
        throw err;
    } 
};