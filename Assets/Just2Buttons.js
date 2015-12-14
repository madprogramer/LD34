#pragma strict

var keyA : String;
var keyB : String;
var systemAxis : String;
var soundOn : boolean;
var switchHeld : boolean;
var startUpTimer : float;
var remainingTime : float;
var recordingTime : float;
var recordedTime : float;
var maxRecording : float;


var TEXTDISPLAY : GameObject;

var oldevents = new Array();
var events  = new Array();
var mark : float;
var type : int;
var evalue : float;

var previouspitch : float;
var iance: float;

//USE THIS TO DETeCT A SINGLE KEY PRESS
/*
 foreach(KeyCode vKey in System.Enum.GetValues(typeof(KeyCode))){
             if(Input.GetKey(vKey)){
             //your code here
                 
             }
         }
*/

function Start () {
	soundOn = false;
	switchHeld = false;
	startUpTimer = 3.0;
	maxRecording = 1.0;
	remainingTime = maxRecording;
	gameObject.GetComponent(AudioSource).enabled = false;
	gameObject.GetComponent(ParticleSystem).enableEmission  = false;
	events = [];
	oldevents = [];
	iance = 0.00100;
}

function Update () {
	//GET READY
	if(startUpTimer > 0.0){
		startUpTimer-=Time.deltaTime;
		soundOn = true;
		//Debug.Log("Remaining Time: ");
		//Debug.Log(startUpTimer);
		TEXTDISPLAY.GetComponent(UI.Text).text = "Get Ready:\n" + startUpTimer.ToString();
		
		//Debug.Log( Input.GetAxis(systemAxis) );
		if( transform.position.y + Input.GetAxis(systemAxis) * 0.125 < 9.5 && transform.position.y + Input.GetAxis(systemAxis) * 0.125 > -9.5 )
		{
			gameObject.GetComponent(AudioSource).pitch += Input.GetAxis(systemAxis)*iance;
			//Debug.Log( gameObject.GetComponent(AudioSource).pitch );
			transform.Translate( Input.GetAxis(systemAxis) * Vector3.left * 0.125);
		}
		
		if(startUpTimer < 0.0)
		{
			gameObject.GetComponent(AudioSource).enabled = true;
			gameObject.GetComponent(ParticleSystem).enableEmission  = true;
			//Start Event
			events.push(0.0);
			events.push(0);
			events.push(gameObject.GetComponent(AudioSource).pitch);
			TEXTDISPLAY.GetComponent(UI.Text).text = "" ;
		}
	}
	
	//BEGIN
	else{
		//TEXTDISPLAY.GetComponent(UI.Text).text = remainingTime.ToString();
		//remainingTime-=Time.deltaTime;
		//Default Controls For Desktop and Laptops 
		if(  (Input.GetButtonDown(keyA) && Input.GetButton(keyB)) || (Input.GetButtonDown(keyB) && Input.GetButton(keyA) )  ){ 
			if(!switchHeld)
			{
				if(soundOn){
						Debug.Log("Sound switched off");
						soundOn = false;
						switchHeld = true;
						gameObject.GetComponent(AudioSource).enabled = false;
						gameObject.GetComponent(ParticleSystem).enableEmission  = false;
				}
				else{
						Debug.Log("Sound switched back on");
						soundOn = true;
						switchHeld = true;
						gameObject.GetComponent(AudioSource).enabled = true;
						gameObject.GetComponent(ParticleSystem).enableEmission  = true;
				}
			}
			
			else
			{//GRADUALLY
				if(soundOn){
					//gameObject.GetComponent(AudioSource).enabled = true;
				}
				else{
					//gameObject.GetComponent(AudioSource).enabled = false;
				}
			}
		}
		/*else if(Input.GetButtonDown (keyA) )
		{
			Debug.Log("Going Up");
			switchHeld = false;
		}
		//Move up
		else if(Input.GetButtonDown (keyB) )
		{
			Debug.Log("Going Down");
			switchHeld = false;
		}
		//Move down
		else
		{
			switchHeld = false;
		}*/
		
		//Stay
		
		//Use the custom axis (mAxis)
		else
		{
			//Debug.Log( Input.GetAxis(systemAxis) );
			if( transform.position.y + Input.GetAxis(systemAxis) * 0.125 < 9.5 && transform.position.y + Input.GetAxis(systemAxis) * 0.125 > -9.5 )
			{
				gameObject.GetComponent(AudioSource).pitch += Input.GetAxis(systemAxis)*iance;
				//Debug.Log( gameObject.GetComponent(AudioSource).pitch );
				transform.Translate( Input.GetAxis(systemAxis) * Vector3.left * 0.125);
			}
			switchHeld = false;
		}
		
		//if something goes wrong
		//recordedTime = maxTime-remainingTime;
		
		//else
		//recordedTime = maxRecording-remainingTime;
		
		/*if(previouspitch != gameObject.GetComponent(AudioSource).pitch){
			events.push(recordedTime);
			events.push(0);
			events.push(gameObject.GetComponent(AudioSource).pitch);
		}*/
		//previouspitch = gameObject.GetComponent(AudioSource).pitch;
		
	}
	
	//END AND PLAY REPLAY
	/*else{
		
	}*/
}