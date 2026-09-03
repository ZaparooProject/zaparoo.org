---
title: "Creating RFID Cards Tags & Mappings"
---

From the ZapEsp32 Web UI, click the **`CREATE`** menu item.  
  
From this page you will be able to search for games, and set the Launch & Remove event audio clip files for each Card/Tag you create.  The process is guided and the UI will tell you when to place your Card/Tag on/in the ZapEsp32 for writing. You should start by removing all cards/tags currently on/in the ZapEsp32.  
  
![Create Tag](https://raw.githubusercontent.com/ZaparooProject/zaparoo-esp32/main/wikires/WebUI_Create.png)

1. Select the **Source** device you wish to create Cards/Tags for. If you have added more games since you last created cards/tags, or this is the first time you are creating cards/tags for this **Source**, you should click the **`Update Zap DB`** button. You will get progression & completion notifications as the DB is updated by the Zaparoo service.  
  
2. Select the system(s) you wish to run a search against and enter the search query. Click Search to continue. (It may take a few seconds to process the search)   
  
3. Select the game you wish to write to the card/tag from the selection list of results (this list is limited to 250 items).  
  
4. Check that the game will lauch correctly by clicking the **`Test Launch`** button. If it fails referr to the Zaparoo help [wiki](https://wiki.zaparoo.org/) for more information.  
  
5. Add file names for Launch & Remove events for this game, if left blank ZapEsp32 will use the default Launch & Remove sounds. You can access the file manager at any time by clicking the **`FILE MANAGER`** menu item. The file manager will open in a new tab/window to facilitate easy file name lookup and file management.  
  
6. Click **`Write To Card`** and follow the on screen prompts to complete the process.  
  
### Create Zaparoo Mapping  
**Zaparoo** has an internal mapping database which allows the mapping of a read-only NFC Tag/Amiibo UID to a set of commands which will execute when the UID of the Tag is sent to Zaparoo. The **ZapEsp32** **`Create Zaparoo Mapping`** button enables the creation of a simple mapping in the **Zaparoo** mapping database to launch the selected game plus set launch and remove audio file paths for **ZapEsp32**.   
  
Click the **`Create Zaparoo Mapping`** button, and follow the on screen prompts.
  
_**Note:**_ If an existing Mapping DB entry already exists for the UID of the scanned Tag/Amiibo, it will be overwritten. Existing UID Audio file paths will be also be overwritten.   
  
## Manual Mode  
Selecting Manual from source list, enables you to set the test for all three card/tag fields manually. The card writing process follows the same steps as above.  
  
![Create Manual Mode](https://raw.githubusercontent.com/ZaparooProject/zaparoo-esp32/main/wikires/WebUI_Create_Manual.png)