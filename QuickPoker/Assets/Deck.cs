	using UnityEngine;
	using System.Collections;
	public enum SuitEnum {
		Hearts=1,
		Clubs=2,
		Diamonds=3,
		Spades=4,
	}
	public class Deck : MonoBehaviour {
	ArrayList full_deck = new ArrayList(); 
		// Use this for initialization
		void Start () {
			InitializeDeck ();
		}
		void InitializeDeck () {
			Vector2 tempCard = new Vector2 (0,0);
		for (int i = 0; i < 4; i++) {		
			for (int j = 0; j < 13; j++) {
					tempCard.x = i;
					tempCard.y = j;
					full_deck.Add(tempCard);
				}
			}

		}
		public	void Shuffle () {


			
		}
		// Update is called once per frame
		void Update () {
		
		}
	}
