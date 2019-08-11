## Get your storage connection strings

Read more [here](https://docs.microsoft.com/en-us/azure/azure-functions/functions-run-local#get-your-storage-connection-strings)

### Download all settings from an existing function app

```
func azure functionapp fetch-app-settings <FunctionAppName>
```

### Get the Connection string for a specific storage account

```
func azure storage fetch-connection-string <StorageAccountName>
```