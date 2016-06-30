using UnityEngine;
using System.Collections;

public class Card_Controller : MonoBehaviour {
	float currFrame;
	public int card_suit;
	public int card_number;
	// Use this for initialization
	void Start () {
		StopAnimation ();

	}	
	// Update is called once per frame
	void Update () {


	}
	void StopAnimation () {
		//get the component and stop the animation
		GetComponent<Animator>().speed = 0;
	}
	//This method sets a random card 
	public void SetFrame (Vector2 Card) {
		string symbol = "";
		card_suit = (int)Card.x;
		card_number = (int)Card.y;
		switch (card_suit) {
		case 0:
			symbol +="hearth";
			break;
		case 1:
			symbol +="club";
			break;
		case 2:
			symbol +="spade";
			break;
		case 3:
			symbol +="diamond";
			break;

		}
		symbol += "_animation";
		float Frametimer = (1f / 13f) *Card.y;
	
		this.GetComponent<Animator> ().Play (symbol, 0, Frametimer);
	}
	//This function increases the frame so it can see
	void IncreaseFrame () {
		this.currFrame += 1.0f;
		float Frametimer = (1f / 13f) *currFrame;
		GetComponent<Animator> ().Play ("diamonds_animation", 0, Frametimer);	
		if (this.currFrame >= 13)
			this.currFrame = 0;
	}
}
