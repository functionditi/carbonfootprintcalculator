flagCommute=0;
    checkCommute[checkIndexCommute]=commuteval;
    checkIndexCommute++;
    if (checkIndexCommute>5){
      if (checkCommute[0]==checkCommute[1] && checkCommute[0]==checkCommute[2] && checkCommute[0]==checkCommute[3] && checkCommute[0]==checkCommute[4]){
        flagCommute=1;
        commutedata=5;
      }
      else{
        flagCommute=0;

        if (checkCommute[0]!=5)
          commutedata=checkCommute[0];
        else if (checkCommute[1]!=5)
          commutedata=checkCommute[1];
      }

      checkIndexCommute=0;
    }


    
