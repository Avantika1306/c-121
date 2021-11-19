function setup() {
    canvas = createCanvas(300, 300);
    canvas.center();
    video = createCapture(VIDEO);
    video.hide();
    classifier=ml5.imageClassifier('MobileNet',ModelLoaded);
  }
  function ModelLoaded(){
      console.log("ModelLoaded");
  }
  
  function draw(){
      image(video,0,0,300,300);
      classifier.classify(video,gotResult);
  }
  previousResult="";
  function gotResult(error,results){
      if (error){
          console.error(error);
  }
  else{
      
      if(results[0].confidence>0.5&&previousResult!=results[0].label){
        console.log(results);
        previousResult=results[0].label;
        synth=window.speechSynthesis;
        speakData1="object Dedected is "+results[0].label;
        utterThis=new SpeechSynthesisUtterance(speakData1);
        synth.speak(utterThis);
        document.getElementById("result_object_name").innerHTML=results[0].label;
        document.getElementById("result_accuracy_name").innerHTML=results[0].confidence.toFixed(3);
      }
  }
  }