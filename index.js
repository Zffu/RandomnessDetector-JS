class RandomnessDetector {
	constructor(string) {
		this.stringToDetect = string
		this.randomness = 0
		this.detections = 0
		this.isRandom = "UNLIKELY"
	}
	detect() {
		this._performAllDetections()
		if(this.randomness > 25) {
			this.isRandom = "UNSURE"
		}
		if(this.randomness > 50) {
			this.isRandom = "SURE"
		}
		if(this.randomness == 100) {
			this.isRandom = "PRETTYSURE"
		}
		return {
			randomness: this.randomness,
			result: this.isRandom,
			string: this.stringToDetect,
			detections: this.detections
		}
	}
	_performAllDetections() {
		this._detectLetterAndNumberBalance()
		this._detectWeirdNumbersAfterMaj()
		this._detectWeirdNumbersBeforeMaj()
	}
	
	// RANDOMNESS DETECTIONS
	
	_detectLetterAndNumberBalance() {
		let l = this._getAmountOfLetters(this.stringToDetect)
		let n = this._getAmountOfNumbers(this.stringToDetect)
		if(n > l) {
			this.randomness += 5
			this.detections += 1
		}
		if(n == l) {
			this.randomness += 5
			this.detections += 1
		}
	}
	
	_detectWeirdNumbersAfterMaj() {
		let isLastCharacterMaj = false;
		let isWeird = false;
		
		let l = this._getListOfMajLettersAndNumbers(this.stringToDetect)
		l.forEach(c => {
			if(this._isLetter(c)) {
				isLastCharacterMaj = true;
			}	
			else {
				if(isLastCharacterMaj) {
					isLastCharacterMaj = false;
					isWeird = true;
					this.detections += 1
					this.randomness += 1
				}
			}
		})
		
		if(isWeird) {
			this.randomness += 5
		}
	}
	_detectWeirdNumbersBeforeMaj() {
		let isLastCharacterNumber = false;
		let isWeird = false;
		
		let l = this._getListOfMajLettersAndNumbers(this.stringToDetect)
		l.forEach(c => {
			if(!this._isLetter(c)) {
				isLastCharacterNumber = true;
			}	
			else {
				if(isLastCharacterNumber) {
					isLastCharacterNumber = false;
					isWeird = true;
					this.detections += 1
					this.randomness += 1
				}
			}
		})
		
		if(isWeird) {
			this.randomness += 5
		}
	}
	
	
	// UTILS
	
	_getAmountOfLetters(string) {
		let amount = 0;
		let s = string.replace(/[^a-z]/gi, "")
		amount = s.split("").length;
		return amount
	}
	_getAmountOfNumbers(string) {
		let amount = 0;
		let s = string.replace(/[^0-9]/gi, "")
		amount = s.split("").length;
		return amount
	}
	_getListOfMajLettersAndNumbers(string) {
		let s = string.replace(/[^A-Z0-9]/g, "")
		return s.split("")
	}	
	_isLetter(s) {
		s = s.replace(/[^a-z]/gi, "")
		if(s == "") {
			return false;
		}
		else {
			return true;
		}
	}	
	
}
