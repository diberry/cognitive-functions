const textAnalytics = require("azure-cognitiveservices-textanalytics");
const CognitiveServicesCredentials = require('@azure/ms-rest-azure-js').CognitiveServicesCredentials;

module.exports = async function (context, myQueueItem) {

    try {

        context.log(`JavaScript queue trigger function processed work item = \'${myQueueItem}\' ${(+new Date).toString()}`);

        let credentials = new CognitiveServicesCredentials(
            process.env["COGNITIVETEXTANALYTICS"]
        );
        let client = new TextAnalyticsAPIClient(
            credentials,
            "https://westus.api.cognitive.microsoft.com/"
        );
        const inputDocuments = {
            documents: [
                { id: "1", text: myQueueItem }
            ]
        };
        const results = await client.detectLanguage({
            languageBatchInput: inputDocuments
        });


        context.bindings.outputQueueItem = {
            'detectedLanguages': results.documents[0].detectedLanguages,
            'text': myQueueItem.text,
            'toLanguages': ["it"] //myQueueItem.toLanguages 
        };

        console.log(`\toutputQueueItem: ${context.bindings.outputQueueItem}`)

    } catch (err) {
        throw err;
    }
};

