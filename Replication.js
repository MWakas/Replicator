//<script type="text/javascript" src="E:\Replicator\lib\jquery-1.11.3.js"/>
    var rl = require("readline");
    var prompts = rl.createInterface(process.stdin, process.stdout);
    var nation_names = [];
    var source_nation,target_nation;
    var databases = [];
    databases.push("collectionlist");
    databases.push("coursestep");
    databases.push("groups");
    databases.push("publications");
    databases.push("resources");
    prompts.question("Please enter the input in the format of source+target: ", function(input){
        if(input != ""){
            var nations = input.split('+');
            nation_names = nations;
            source_nation = nation_names[0];
            target_nation = nation_names[1];
            calling_Replication();
        }
        else {
            console.log("Invalid input");
            process.exit();
        }
        //process.exit();
    });

    function calling_Replication(){
        /*for(var i = 0 ; i < databases.length ; i++) {
         replicateDatabases(source_nation, target_nation, databases[i]);
         }*/
        replicateDatabases(source_nation, target_nation, "activitylog");
    }

    function replicateDatabases(source_url,target_url,db_Name) {
        var src_nation_name = source_url.substring(0 , source_url.lastIndexOf(".ole.org"));
        var trg_nation_name = target_url.substring(0 , target_url.lastIndexOf(".ole.org"));
        $.ajax({
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json; charset=utf-8'
            },
            type: 'POST',
            url: '/_replicate',
            dataType: 'json',
            data: JSON.stringify({
                "source": source_url + '/' + db_Name,
                "target": 'http://' + trg_nation_name + ':' + 'oleoleole' + '@' + target_url + '/' + db_Name
            }),
            success: function(response) {
                console.log("Successfully Replicated " + db_Name);
            },
            error: function(XMLHttpRequest, textStatus, errorThrown) {
                console.log("Error (Try Later)");
            }
        })
    }