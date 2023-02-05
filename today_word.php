<?PHP
    $data = file_get_contents('words.json');
    $words_file = json_decode($data, true);
    $no_word = true;
    $random_id = 0;
    
    do{
        $random_id = rand(1, 430);
        
        foreach($words_file as $key => $value){
            if($value['id'] == $random_id && $value['dateUsed'] == null){
                $no_word = false;
            }        
        }
    }while($no_word);
    
    //loop to delete all rows but todays word.
    $current_row = 0;
    
    foreach($words_file as $key => $value){
        if(!($value['id'] == $random_id)){
            unset($words_file[$current_row]);
        }
        
        $current_row++;
    }
    
    
    file_put_contents('today_word.json', json_encode($words_file));
    
    echo "File modified sucessfully.";
?>