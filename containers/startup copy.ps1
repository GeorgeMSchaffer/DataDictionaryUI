cd "E:\code\DataDictionaryUIRepo\containers\API\";
Start-Job -ScriptBlock { npm run dev };
cd "E:\code\DataDictionaryUIRepo\containers\UI\";
Start-Job -ScriptBlock { npm run start };
