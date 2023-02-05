$(document).ready(function(){
    $(document).keydown(function(objEvent) {
        let keys = new Array(9, 8, 37, 38, 39, 40, 46);
        
        if ($.inArray(objEvent.keyCode,keys) >= 0) {
            objEvent.preventDefault();
        }
    })

    $("#A1").focus();
    let currentBlock = 'A1';
    
    $(".letter-keys").click(function(){
        let key = $(this).html();

        keyPressed(key, currentBlock);
    });

    $("#btn-del").click(function(){keyPressed("DEL", currentBlock);});

    $("input").keyup(function (objEvent) {
        let element = $(':focus');
        let key = objEvent.keyCode || objEvent.charCode;

        if( key == 8 || key == 46 ) keyPressed("DEL", element.attr('id'));
        else keyPressed(element.val(), element.attr('id'));
    });

    function keyPressed(charIn, block){
        block = "#" + block;
        let char = charIn.toUpperCase();
        let nextInput = block.slice(0, 2) + (parseInt(block.slice(-1)) + 1);
        let prevInput = block.slice(0, 2) + (parseInt(block.slice(-1)) - 1);

        if(char.search(/[A-Z]/g) < 0){
            $(block).val("");
        }
        else{
            if(char != "DEL"){
                $(block).val(char);

                if(block.slice(-1) < 6){
                    currentBlock = nextInput.slice(1,3);
                    $(nextInput).focus();
                }
                else{
                    //Check input word here, disabel current row and move to next row.
                }
            }
            else{
                if($(block).val() == ""){
                    $(prevInput).val("");
                    //Using the onscreen delet button removes focus from the first element on additional use.
                    currentBlock = prevInput.slice(1,3);
                    $(prevInput).focus();
                }
                else $(block).val("");
            }
        }
    }
});
