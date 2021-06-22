
Start-Job -ScriptBlock { cd "E:\code\DataDictionaryUIRepo\containers\API\" npm run dev };

Start-Job -ScriptBlock { cd "E:\code\DataDictionaryUIRepo\containers\UI\" npm run start };
