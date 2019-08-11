const BlobStorage = require('azure-storage-as-promised').Blob;

module.exports = async function (context, myBlob) {

    try{
        context.log("JavaScript blob trigger function processed blob \n Name:", context.bindingData.name, "\n Blob Size:", myBlob.length, "Bytes");

        context.log(`contentType = ${context.bindingData.properties.contentType}`);
        context.log(`myBlob = ${context.bindingData.myBlob}`);

        if(context.bindingData.properties.contentType=="text/plain"){

            context.log("correct content type");


            const container = "function-blob-upload";
            const directory = "";
            const blob = context.bindingData.name;

            context.log("container " + container);
            context.log("directory " + directory);
            context.log("blob " + blob);

            const blobService = new BlobStorage(process.env["diberryassetmgrtest_STORAGE"]);

            context.log("get blobService");

            // text, blockBlob, response
            const results = await blobService.getBlobProperties(container, directory, blob);

            context.log("blob service returned 1 ");

            const textResults = await blobService.getTextFromBlob(container, directory, blob);

            context.log(JSON.stringify(textResults));

            context.bindings.outputQueueItem = textResults;

            return {
                body: {
                    results: results,
                    textResults: textResults
                }
            };

        }

    }catch(err){
        context.log.error('Error',err);
        throw err;
    }
}
