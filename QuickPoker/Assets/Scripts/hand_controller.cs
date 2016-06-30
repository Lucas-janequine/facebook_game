using UnityEngine;
using System.Collections;
using UnityEngine.UI;
/*
Table of ranks
9- Royal Flush X
8-  Straight Flush  X
7-  4 of a kind X this needs 5 cards
6-  Full house X this needs 5 cards
5-  Flush X WORKS
4-  Straight X WORKS
3-  3 of a Kind X Works
2-  2 pair X Works
1- 1 pair X Works
0- high card X Works
*/
public class hand_controller : MonoBehaviour {
	public  Card_Controller[] cards_arr ;
	public Text result_text;
	public string lower_string;
	public Text rank_text;
	public int hand_size;
	public int hand_rank;
	public int hand_highest_number;
	public int rank_highest_number;
	public int highest_two;
	public int lowest_two;
	public Card_Controller[] table_arr;

	// Use this for initialization
	void Start () {
		hand_size = cards_arr.Length ;
		hand_rank = 0;
		hand_highest_number = 0;
		rank_highest_number = 0;
	}
	public void SetHands (Vector2 [] cards) {
		for (int i = 0; i < cards_arr.Length; i++) {
			cards_arr[i].SetFrame (cards[i]);
		}
		ArrayList sortCards = new ArrayList ();
		//Add all the card numbers to the array
		for (int j = 0; j < cards_arr.Length; j++) {
			sortCards.Add (cards_arr[j].card_number);
		}
		sortCards.Sort ();
		highest_two = (int)sortCards[sortCards.Count - 1];
		lowest_two = (int)sortCards[0];
	}
	public void SetText (string result) {
		if ( result_text != null)
		result_text.text = result;
	}
	public void SetLowerText (string hand) {
		if (hand != "")
			rank_text.text = hand;
		else
			rank_text.text = lower_string;
	}
	public void StartChecks () {
		SetHighCard ();
		CheckHand ();
	}
	void OnMouseDown() {
		var test = this.transform.parent.GetComponent<Poker_Controller> ();
		test.CompareHands ();
		if (test.timer <= 0)
			return;
		SetLowerText ("");
		if (result_text.text == "Win")  {
			test.SetTime (2.0f);
			test.SetPoints (2.0f);
		}
		else {
			test.SetTime (-2.0f);

		}
		test.startOver ();
	}
	//This functions checks all the possible combination on the hands
	private void CheckHand () {
		//Todo
 			if (CheckRoyalFlush ()) {
			hand_rank = 9;
			lower_string = "Royal Flush";
				return;
			}					
		//
			if (CheckStraightFlush()){
			hand_rank = 8;
			lower_string = "Straight Flush";
			return;
			}
		//
			if (CheckFourOfAKind ()) {
			lower_string = "Poker";
			hand_rank = 7;
			return;
		}
		//
			if (CheckFullHouse ()) {
			hand_rank = 6;
			lower_string = "Full House";
			return;
		}
		//
			if (CheckFlush ()) {
			hand_rank = 5;
			lower_string = "Flush";
			return;
		}
		//
			if (CheckStraight ()) { 
			hand_rank = 4;
			lower_string = "Straight";
			return;
		}
		// 
			if (CheckThreeOfaKind ()) {
			hand_rank = 3;
			lower_string = "3 of a Kind";
			return;
		}
		//
			if (CheckTwoPairs ()) {
			hand_rank = 2;
			lower_string = "2 Pairs";
			return;
		}
		//WORKSSSSSSSSSSSSS One Pair
			if (CheckOnePair ()) {
			hand_rank = 1;
			lower_string = "1 Pair";
			return;
		}
		hand_rank = 0;
		lower_string = "High Card";
	}
	bool CheckRoyalFlush() {
		//using other functions to check the hand
		//isStraight( PokerHand ) && isFlush( PokerHand ) && Highest card == Ace    
		if (CheckStraight () && CheckFlush () && (hand_highest_number == 12))
			return true;
		return false;
	}
	bool CheckStraightFlush () {
		//use other functions as helpers if they work this one works ;)
		if (CheckStraight () && CheckFlush () )
			return true;
		return false;
	}
	bool CheckStraight() {
		ArrayList sortCards = new ArrayList ();
		//Add all the card numbers to the array
		for (int i = 0; i < cards_arr.Length; i++) {
			sortCards.Add (cards_arr[i].card_number);
		}
		if (table_arr.Length == 0)
			return false;
		for (int i = 0; i < table_arr.Length; i++) {
			sortCards.Add (table_arr[i].card_number);
		}
		if (sortCards.Count < 5 )
			return false;
		sortCards.Sort ();
		/* ===========================
         Check if hand has an Ace
         =========================== */
		if ( (int)sortCards[4] == 12 )
		{
			/* =================================
            Check straight using an Ace
            ================================= */
			bool a = (int)sortCards[0] == 0 && (int)sortCards[1] == 1 &&
				(int)sortCards[2] == 2 && (int)sortCards[3] == 3 ;
			bool b = (int)sortCards[0] == 8 && (int)sortCards[1] == 9 &&        
				(int)sortCards[2] == 10 && (int)sortCards[3] == 11 ;
			rank_highest_number = (int)sortCards[sortCards.Count - 1];
			return ( a || b );
		}
		else
		{
			/* ===========================================
            General case: check for increasing values
            =========================================== */
			int testRank = (int)sortCards[0] + 1;
			
			for (int  i = 1; i < 5; i++ )
			{
				if ( (int)sortCards[i]!= testRank )
					return(false);        // Straight failed...
				
				testRank++;   // Next card in hand
			}

				rank_highest_number = (int)sortCards[sortCards.Count - 1];
			return(true);        // Straight found !
		}

	}
	bool CheckFourOfAKind() {
		ArrayList sortCards = new ArrayList ();
		//Add all the card numbers to the array
		for (int i = 0; i < cards_arr.Length; i++) {
			sortCards.Add (cards_arr[i].card_number);
		}
		for (int i = 0; i < table_arr.Length; i++) {
			sortCards.Add (table_arr[i].card_number);
		}
		if (sortCards.Count < 5 )
			return false;
		if (table_arr.Length == 0)
			return false;
		sortCards.Sort ();
		
		/* ------------------------------------------------------
         Check for: 4 cards of the same rank 
	            + higher ranked unmatched card 
	 ------------------------------------------------------- */     
		bool a1 = 	(int)sortCards[0] ==(int)sortCards[1] &&
					(int)sortCards[1] ==(int)sortCards[2] &&
					(int)sortCards[2] ==(int)sortCards[3];	
		if (a1)
			rank_highest_number = (int)sortCards[0];
		/* ------------------------------------------------------
         Check for: lower ranked unmatched card 
	            + 4 cards of the same rank 
	 ------------------------------------------------------- */   
		bool a2 = 	(int)sortCards[1] == (int)sortCards[2] &&
					(int)sortCards[2] == (int)sortCards[3] &&
					(int)sortCards[3] == (int)sortCards[4] ;
		if (a2)
			rank_highest_number = (int)sortCards[2];
		return( a1 || a2 );
	}
	bool CheckFullHouse() {
		ArrayList sortCards = new ArrayList ();
		//Add all the card numbers to the array
		for (int i = 0; i < cards_arr.Length; i++) {
			sortCards.Add (cards_arr[i].card_number);
		}
		for (int i = 0; i < table_arr.Length; i++) {
			sortCards.Add (table_arr[i].card_number);
		}
		if (table_arr.Length == 0)
			return false;
		if (sortCards.Count < 5) {
			Debug.Log ("Missing Cards on players hand!!!");
		}
		if (sortCards.Count < 5 )
			return false;
		//Sort Cards
		sortCards.Sort ();

		/* ------------------------------------------------------
         Check for: x x x y y
	 ------------------------------------------------------- */  
		bool  a1 =  (int)sortCards[0] == (int)sortCards[1]&&
					(int)sortCards[1] == (int)sortCards[2] &&
					(int)sortCards[3] == (int)sortCards[4];
		if (a1)
			rank_highest_number = (int)sortCards[0];
		/* ------------------------------------------------------
         Check for: x x y y y
	 ------------------------------------------------------- */
		bool a2 = 	(int)sortCards[0] == (int)sortCards[1] &&
					(int)sortCards[2] == (int)sortCards[3] &&
					(int)sortCards[3] == (int)sortCards[4];
		if (a2)
			rank_highest_number = (int)sortCards[2];
		return (a1 || a2);

	}
	//Check to see if the hand is a flush
	bool CheckFlush () {
		ArrayList sortCards = new ArrayList ();
		//Add all the card numbers to the array
		for (int i = 0; i < cards_arr.Length; i++) {
			sortCards.Add (cards_arr[i].card_suit);
		}
		for (int i = 0; i < table_arr.Length; i++) {
			sortCards.Add (table_arr[i].card_suit);
		}
		if (sortCards.Count < 5 )
			return false;
		sortCards.Sort ();
		if ((int)sortCards[0] == (int)sortCards[sortCards.Count - 1]) {
			//rank_highest_number = (int)sortCards[0];
			ArrayList highestCardarr = new ArrayList ();
			//Add all the card numbers to the array
			for (int i = 0; i < cards_arr.Length; i++) {
				highestCardarr.Add (cards_arr[i].card_suit);
			}
			for (int i = 0; i < table_arr.Length; i++) {
				highestCardarr.Add (table_arr[i].card_suit);
			}
			highestCardarr.Sort ();
			rank_highest_number = (int)sortCards[highestCardarr.Count - 1];

			return true;
		}


		return false;

	}
	//Check to see if the hand has two pairs
	//Not Tested
	bool CheckTwoPairs() {
		int pairs_counter = 0;

		ArrayList sortCards = new ArrayList ();
		//Add all the card numbers to the array
		for (int i = 0; i < cards_arr.Length; i++) {
			sortCards.Add (cards_arr[i].card_number);
		}
		for (int i = 0; i < table_arr.Length; i++) {
			sortCards.Add (table_arr[i].card_number);
		}
		if (sortCards.Count < 5 )
			return false;
		if (table_arr.Length == 0)
			return false;
		//Sorts the array to get the checks easier
		sortCards.Sort ();
		for (int i = 0; i < sortCards.Count; ) {
			if ((i+1) < sortCards.Count)
			{
				//If found a pair add 2 so that it skips the pair
				if ((int)sortCards[i] == (int)sortCards[i+1]) {
					pairs_counter++;
					rank_highest_number = (int)sortCards[i];
					i+=2;

				}		
				//If not found a pair add 1 so it moves to the next set of cards
				else
					i++;
			}
			else
				break;
		}
		if (pairs_counter == 2)
			return true;
		return false;

	}
	//Check for three of a kind 
	//Not Tested
	bool CheckThreeOfaKind() {
		int equalcounter = 0;
		bool a1, a2, a3 = false;
		ArrayList sortCards = new ArrayList ();
		//Add all the card numbers to the array
		for (int i = 0; i < cards_arr.Length; i++) {
			sortCards.Add (cards_arr[i].card_number);
		}
		for (int i = 0; i < table_arr.Length; i++) {
			sortCards.Add (table_arr[i].card_number);
		}
		if (sortCards.Count < 5 )
			return false;
		sortCards.Sort ();

		/* ------------------------------------------------------
         Check for: x x x a b
	 ------------------------------------------------------- */    
		 a1 	=(int)sortCards[0] == (int)sortCards[1] &&
			     (int)sortCards[1] == (int)sortCards[2] &&
				 (int)sortCards[3] != (int)sortCards[0] &&
				 (int)sortCards[4] != (int)sortCards[0] &&
				 (int)sortCards[3] != (int)sortCards[4] ;
		if (a1)
			rank_highest_number = (int)sortCards[0];
		/* ------------------------------------------------------
         Check for: a x x x b
	 ------------------------------------------------------- */   
		 a2 	=(int)sortCards[1] ==(int)sortCards[2] &&
			     (int)sortCards[2] ==(int)sortCards[3] &&
				 (int)sortCards[0] !=(int)sortCards[1] &&
				 (int)sortCards[4] !=(int)sortCards[1] &&
				 (int)sortCards[0] !=(int)sortCards[4] ;
		if (a2)
			rank_highest_number = (int)sortCards[1];
		/* ------------------------------------------------------
         Check for: a b x x x
	 ------------------------------------------------------- */   
		 a3 	=(int)sortCards[2] ==(int)sortCards[3] &&
				 (int)sortCards[3] ==(int)sortCards[4] &&
				 (int)sortCards[0] !=(int)sortCards[2] &&
				 (int)sortCards[1] !=(int)sortCards[2] &&
				 (int)sortCards[0] !=(int)sortCards[1] ;
		if (a3)
			rank_highest_number = (int)sortCards[3];

		return( a1 || a2 || a3 );


	}

	//Check to see if the hand has one pair
	bool CheckOnePair() {
		bool return_value = false;
		ArrayList sortCards = new ArrayList ();
		//Add all the card numbers to the array
		for (int i = 0; i < cards_arr.Length; i++) {
			sortCards.Add (cards_arr[i].card_number);
		}
		for (int i = 0; i < table_arr.Length; i++) {
			sortCards.Add (table_arr[i].card_number);
		}
		if (sortCards.Count < 5 )
			return false;
		if (table_arr.Length == 0)
			return false;
		//Sorts the array to get the checks easier
		sortCards.Sort ();
		for (int i = 0; i < sortCards.Count; i++) {
			if ((i+1) < sortCards.Count)
			{
				int a = (int)sortCards[i];
				int b = (int)sortCards[i+1];
				if ((int)sortCards[i] == (int)sortCards[i+1]) {
					rank_highest_number = (int)sortCards[i];
						return_value = true;
				}

			}
		}
	 return return_value;
	}
	// Check the highest card of the hand
	//Not Tested
	bool SetHighCard() {
		ArrayList sortCards = new ArrayList ();
		//Add all the card numbers to the array
		for (int i = 0; i < cards_arr.Length; i++) {
			sortCards.Add (cards_arr[i].card_number);
		}
		for (int i = 0; i < table_arr.Length; i++) {
			sortCards.Add (table_arr[i].card_number);
		}
		if (table_arr.Length == 0)
			return false;
		//Sort the cards
		sortCards.Sort ();
		//Sets the highest on the hand as the last one as it is sorted
		hand_highest_number = (int)sortCards [sortCards.Count - 1]; 
		return true;
	}


	// Update is called once per frame
	void Update () {
	
	}
}
