import { TranslatorText } from require("cognitive-tools");

module.exports = async function (context, myQueueItem) {

    try{

        context.log(`JavaScript queue trigger function processed work item = \'${myQueueItem}\' ${(+new Date).toString()}`);
    
        const config = { 
            'key': process.env.TRANSLATORKEY,
            'endpoint': process.env.TRANSLATORENDPOINT
        };
            
        const translatorText = new TranslatorText(config);

        const response = await translatorText.translate(myQueueItem.text,languages);

        context.bindings.outputQueueItem = {
            'detectedLanguages':  myQueueItem.detectedLanguages,
            'text': myQueueItem.text,
            'toLanguages': myQueueItem.toLanguages,
            'translations': response[0].translations
        };        
        
    }catch(err){
        throw err;
    } 

};