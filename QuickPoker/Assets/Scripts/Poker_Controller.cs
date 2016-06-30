using UnityEngine;
using System.Collections;
using UnityEngine.UI;
public class Poker_Controller : MonoBehaviour {
	public Deck deck_obj;
	ArrayList full_deck = new ArrayList(); 
	public  hand_controller[] hands_arr ;
	public float timer;
	public float points;
	public Text timer_text;
	public Text points_text;
	// Use this for initialization
	public void Start () {
		InitializeDeck ();
	
	}
	public void InitializeDeck () {
		InitDeck ();
		
	}
	public void InitDeck () {
		Vector2 tempCard = new Vector2 (0,0);
		full_deck.Clear ();
		for (int i = 0; i < 4; i++) {		
			for (int j = 0; j < 13; j++) {
				tempCard.x = i;
				tempCard.y = j;
				full_deck.Add(tempCard);
			}
		}
	}

	//Compare Hands
	public void CompareHands () {
		hands_arr[0].SetLowerText ("");
		hands_arr[1].SetLowerText ("");
		if (hands_arr[0].hand_rank > hands_arr[1].hand_rank)
		{
			hands_arr[0].SetText ("Win");
			hands_arr[1].SetText ("Lost");
		}
		else if (hands_arr[0].hand_rank < hands_arr[1].hand_rank) {
			hands_arr[1].SetText ("Win");
			hands_arr[0].SetText ("Lost");
		}
		else {
			if (hands_arr[0].rank_highest_number > hands_arr[1].rank_highest_number)
			{
				hands_arr[0].SetText ("Win");
				hands_arr[1].SetText ("Lost");
			}
			else if (hands_arr[0].rank_highest_number < hands_arr[1].rank_highest_number) 
			{
				hands_arr[1].SetText ("Win");
				hands_arr[0].SetText ("Lost");
			}
			else 
			{
				if (hands_arr[0].hand_highest_number > hands_arr[1].hand_highest_number)
				{
					hands_arr[0].SetText ("Win");
					hands_arr[1].SetText ("Lost");
				}
				else if (hands_arr[0].hand_highest_number < hands_arr[1].hand_highest_number) 
				{
					hands_arr[1].SetText ("Win");
					hands_arr[0].SetText ("Lost");
				}
				else
				{
					if (hands_arr[0].highest_two > hands_arr[1].highest_two)
					{
						hands_arr[0].SetText ("Win");
						hands_arr[1].SetText ("Lost");
					}
					else if (hands_arr[0].highest_two < hands_arr[1].highest_two) 
					{
						hands_arr[1].SetText ("Win");
						hands_arr[0].SetText ("Lost");
					}
					else
					{
					
						if (hands_arr[0].lowest_two > hands_arr[1].lowest_two)
						{
							hands_arr[0].SetText ("Win");
							hands_arr[1].SetText ("Lost");
						}
						else if (hands_arr[0].lowest_two < hands_arr[1].lowest_two) 
						{
							hands_arr[1].SetText ("Win");
							hands_arr[0].SetText ("Lost");
						}
						else {
								hands_arr[1].SetText ("Draw");
								hands_arr[0].SetText ("Draw");
						}
					}
				}
			}
		}
	}
	public	void Shuffle () {
		int randomCounter = full_deck.Count;
		//Moves a random number to the end and deletes it self from places
		for (int i = 0; i < randomCounter; i++) {
			int randomIndex = Random.Range (0,full_deck.Count);
			full_deck.Add(full_deck[randomIndex]); //add it to the new, random list
			full_deck.RemoveAt(randomIndex); //remove to avoid duplicates
		}
		full_deck.Reverse ();
		//Reverses and shuffles again
		for (int i = 0; i < randomCounter; i++) {
			int randomIndex = Random.Range (0,full_deck.Count);
			full_deck.Add(full_deck[randomIndex]); //add it to the new, random list
			full_deck.RemoveAt(randomIndex); //remove to avoid duplicates
		}
	}

	 void DrawCard () {
		for (int i = 0; i < hands_arr.Length; i++) {
			Vector2 [] Hand = new Vector2[hands_arr[i].hand_size];
			for (int j = 0; j < hands_arr[i].hand_size; j++) {
				Hand[j] =  (Vector2) full_deck[0];
				full_deck.RemoveAt(0);			
			}
			hands_arr[i].SetHands (Hand);
		}
		for (int i = 0; i < hands_arr.Length; i++) {
			hands_arr[i].StartChecks ();
		}

		
	}
	public void SetTime (float newTime) {
		timer += newTime;
		timer_text.text = "Time Left:" + Mathf.Round(timer);
	}
	public void SetPoints (float newPoints) {
		points += newPoints;
		points_text.text = "Points:" + Mathf.Round(points);
	}
	public void startOver () {
		InitDeck ();
		Shuffle ();
		DrawCard ();
		hands_arr[1].SetText ("Waiting");
		hands_arr[0].SetText ("Waiting");
		hands_arr[1].SetLowerText ("Waiting");
		hands_arr[0].SetLowerText ("Waiting");
	
	
	}
	
	// Update is called once per frame
	void Update () {
		if (Input.GetKeyDown ("space")) {
			startOver ();
			timer = 20.0f;
			points = 0;
			points_text.text = "Points:" + Mathf.Round(points);
		}
		//timer
		timer -=Time.deltaTime;
		if (timer < 0) {
			timer = 0;
		}
		timer_text.text = "Time Left:" + Mathf.Round(timer);
	

	}
}
