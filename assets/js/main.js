"use strict";

// ===================================================
//   									Rechner-Auswahl
// ===================================================

const showCalculator = () => {

	const wrappers = document.querySelectorAll('.calc__wrapper');
	const buttons = document.querySelectorAll('button');

	buttons.forEach((button, index) => {
		button.addEventListener('click', () => {
			wrappers.forEach((wrapper, i) => {
				if (index === i) {
					wrapper.classList.add('calc__show');
				} else {
					wrapper.classList.remove('calc__show');
				}
			});

			buttons.forEach((btn, idx) => {
				if (index === idx) {
					btn.classList.add('active');
				} else {
					btn.classList.remove('active');
				}
			});
		});
	});
};

showCalculator();



// ===================================================
//   				Project Optimalgewicht-Rechner
// ===================================================

// ===================================================
//    	 			Berechnung des Idealgewichts
// ===================================================

// Radio Buttons - wide/slim
const rdBtnPhysique = document.querySelectorAll("input[name='physique']");

// Input Height
const idealweightInputHeight = document.querySelector("#idealweight__height");

// Input Age
const idealweightInputAge = document.querySelector("#idealweight__age");

let idealweightHeight = 0;
let idealweightAge = 0;

const updateValue = (e) => {
	if (e.target.id === "idealweight__height") {
		idealweightHeight = Number(e.target.value);
	} else if (e.target.id === "idealweight__age") {
		idealweightAge = Number(e.target.value);
	}

	// Call updateOutput() function to update output
	updateOutput();
};

// Event-Listener für Input Text-Felder und Aufruf von updateValue()
idealweightInputHeight.addEventListener("input", updateValue);
idealweightInputAge.addEventListener("input", updateValue);

// Idealgewichtsberechnungen
const idealWeight = () => {
	if (idealweightHeight === 0 || idealweightAge === 0) {
		return false;
	} else {
		if (rdBtnPhysique[0].checked) {
			return (
				((idealweightHeight - 100 + idealweightAge / 10) * 0.9 * 1.1).toFixed(2)
			);
		} else if (rdBtnPhysique[1].checked) {
			return (
				((idealweightHeight - 100 + idealweightAge / 10) * 0.9 * 0.9).toFixed(2)
			);
		}
	}
};

// Ausgabe-Funktion des Idealgewichts über idealWeight()
const updateOutput = () => {
	const idealweightOutput = document.querySelector("#idealweight__output");

	// Error Handling
	if (idealWeight() === false) {
		idealweightOutput.textContent = "Bitte füllen Sie alle Felder aus!";
		return false;
	} else {
		// Ausgabe des Idealgewichts
		idealweightOutput.innerHTML = `Dein Idealgewicht beträgt: <span>${idealWeight().replace(
			".",
			","
		)} kg.</span>`;
	}
};

// Button Klick-Funktion für idealWeight() Berechnung über updateOutput() Ausgabe
const idealweightBtnCalc = document.querySelector("#idealweight__btnCalc");

idealweightBtnCalc.addEventListener("click", (event) => {
	event.preventDefault();
	const idealweightOutput = document.querySelector("#idealweight__output");
	idealweightOutput.style.display = "block";
	updateOutput();
});

// Bei Änderung der Radio-Buttons updateOutput() zur Neuberechnung über idealWeight() aufrufen
rdBtnPhysique.forEach((rdBtn) => {
	rdBtn.addEventListener("click", () => {
		updateOutput();
	});
});




// ===================================================
//     					Project Kalorien-Rechner
// ===================================================

// ===================================================
//    	 			Berechnung des Grundumsatzes
// ===================================================

// Radio Buttons - Male/Female
let rdBtnGender = document.querySelectorAll("input[name='gender']");

const basalMetabolism = () => {
	// Input Height
	const inputHeight = Number(document.querySelector("#height").value);

	// Input Age
	const inputAge = Number(document.querySelector("#age").value);

	// Input Weight
	const inputWeight = Number(document.querySelector("#weight").value);

	// Input Error Output
	const inputErrorOutput = document.querySelector("#inputErrorOutput");

	if (inputHeight === 0 || inputAge === 0 || inputWeight === 0) {
		inputErrorOutput.style.display = "block";
		inputErrorOutput.textContent =
			"Bitte geben Sie ihre Körpergröße, ihr Alter und ihr Gewicht ein, um ihren Grundumsatzumsatz berechnen zu können.";
		return false;
	} else {
		inputErrorOutput.style.display = "none";
		if (rdBtnGender[0].checked) {
			// Grundumsatz bei Frauen (Kalorien je Tag) 655.1 + (9.6 * Körpergewicht in kg) + (1.8 * Körpergröße in cm) – (4.7 * Alter in Jahren) = Grundumsatz
			const femaleBasalMetabolism = (
				655.1 +
				9.6 * inputWeight +
				1.8 * inputHeight -
				4.7 * inputAge
			).toFixed(2);
			return femaleBasalMetabolism;
		} else if (rdBtnGender[1].checked) {
			// Grundumsatz bei Männern (Kalorien je Tag) 66.47 + (13.7 * Körpergewicht in kg) + (5 * Körpergröße in cm) – (6.8 * Alter in Jahren) = Grundumsatz
			const maleBasalMetabolism = (
				66.47 +
				13.7 * inputWeight +
				5 * inputHeight -
				6.8 * inputAge
			).toFixed(2);
			return maleBasalMetabolism;
		}
	}
};

// ===================================================
//     		   	Berechnung des Gesamtumsatzes
// ===================================================

const totalMetabolism = () => {
	// Select
	const physicalStress = document.querySelector("#physicalStress").value;
	// Select Error Output
	const selectErrorOutput = document.querySelector("#selectErrorOutput");

	if (physicalStress === "disabled") {
		selectErrorOutput.style.display = "block";
		selectErrorOutput.textContent =
			"Bitte wählen Sie eine körperliche Belastung aus, um den Gesamtumsatz berechnen zu können.";
	} else {
		selectErrorOutput.style.display = "none";
		return (physicalStress * basalMetabolism()).toFixed(2);
	}
};

// ===================================================
//     	  			Berechnung von kcal in kJ
// ===================================================

// Output Fields
const basalMetabolismKcal = document.querySelector("#basalMetabolismKcal");
const basalMetabolismKj = document.querySelector("#basalMetabolismKj");
const totalMetabolismKcal = document.querySelector("#totalMetabolismKcal");
const totalMetabolismKj = document.querySelector("#totalMetabolismKj");

const calcOfKcalByKj = () => {
	// Ausgabe von kcal
	basalMetabolismKcal.textContent = basalMetabolism().replace(".", ",");
	totalMetabolismKcal.textContent = totalMetabolism().replace(".", ",");
	// Umrechnung von kcal in kJ und Ausgabe
	basalMetabolismKj.textContent = (basalMetabolism() * 4.1868)
		.toFixed(2)
		.replace(".", ",");
	totalMetabolismKj.textContent = (totalMetabolism() * 4.1868)
		.toFixed(2)
		.replace(".", ",");
}

// ===================================================
//     	  								Ausgabe
// ===================================================

const btnCalc = document.querySelector("#btnCalc");

// Button Klick-Function für Kalorien-Berechnung
btnCalc.addEventListener("click", (event) => {
	event.preventDefault();

	// Select
	const physicalStress = document.querySelector("#physicalStress");

	if (basalMetabolism() === false || totalMetabolism() === undefined) {
		basalMetabolismKcal.textContent = 0;
		basalMetabolismKj.textContent = 0;
		totalMetabolismKcal.textContent = 0;
		totalMetabolismKj.textContent = 0;
		return false;
	} else {
		calcOfKcalByKj()
	}

	// Bei Änderung des Radio-Button auch Berechnung durchführen
	rdBtnGender.forEach((rdBtn) => {
		rdBtn.addEventListener("click", () => {
			calcOfKcalByKj()
		})
	})

	// Bei Änderung des Select-Feldes auch Berechnung durchführen
	physicalStress.addEventListener("click", () => {
		calcOfKcalByKj()
	})
});

// ===================================================
//   				Project Mehrwertsteuer-Rechner
// ===================================================

const btnSubmit = document.querySelector("#btn-submit");

// Radio Buttons - MwSt aufschlagen/abziehen
let rdBtnNetGross = document.querySelectorAll("input[name='netGross']");
// Radio Buttons - Mehrwertsteuersatz
let rdBtnVatRate = document.querySelectorAll("input[name='vatRate']");

const allRdBtn = document.querySelectorAll("input[type='radio']");

// Textaustausch von Labeltext des Numberfeldes und h3 von .grossNetAmount
const labelNetAmount = document.querySelector(".netAmount");
const grossNetHeadline = document.querySelector(".grossNetAmount h3");

// Mehrwertsteuerbetrag
const vatAmountOutput = document.querySelector(".vatAmount p");
// Brutto-/Netto-Betrag
const grossNetOutput = document.querySelector(".grossNetAmount p");

rdBtnNetGross[0].addEventListener("click", () => {
	labelNetAmount.innerHTML =
		"Nettobetrag (Preis ohne Mehrwertsteuer) in Euro<span>*</span>";
	grossNetHeadline.textContent = "Bruttobetrag (Endpreis)";
});

rdBtnNetGross[1].addEventListener("click", () => {
	labelNetAmount.innerHTML =
		"Bruttobetrag (Preis inklusive Mehrwertsteuer) in Euro<span>*</span>";
	grossNetHeadline.textContent = "Nettobetrag";
});

// Bei Änderung der Berechnungsmethode, durch Klick auf Radio-Button, Ausgabe zurücksetzen
allRdBtn.forEach((rdBtn) => {
	rdBtn.addEventListener("click", () => {
		vatAmountOutput.textContent = "€";
		grossNetOutput.textContent = "€";
	});
})

// Button Klick-Function für MwSt-Berechnung
btnSubmit.addEventListener("click", (event) => {
	event.preventDefault();

	// Number Eingabe
	const netGrossAmountInput = Number(
		document.querySelector("#netAmount").value
	);

	if (rdBtnNetGross[0].checked && rdBtnVatRate[0].checked) {
		// 19% MwSt aufschlagen
		let vatAmountResult = Number((netGrossAmountInput * 0.19).toFixed(2));
		vatAmountOutput.textContent = vatAmountResult.toLocaleString('de-DE', { style: 'currency', currency: 'EUR' });
		grossNetOutput.textContent = (
			netGrossAmountInput + vatAmountResult
		).toLocaleString('de-DE', { style: 'currency', currency: 'EUR' });
	} else if (rdBtnNetGross[0].checked && rdBtnVatRate[1].checked) {
		// 7% MwSt aufschlagen
		let vatAmountResult = Number((netGrossAmountInput * 0.07).toFixed(2));
		vatAmountOutput.textContent = vatAmountResult.toLocaleString('de-DE', { style: 'currency', currency: 'EUR' });
		grossNetOutput.textContent = (
			netGrossAmountInput + vatAmountResult
		).toLocaleString('de-DE', { style: 'currency', currency: 'EUR' });
	} else if (rdBtnNetGross[1].checked && rdBtnVatRate[0].checked) {
		// 19% MwSt abziehen
		let netAmountResult = Number(
			((netGrossAmountInput * 100) / 119).toFixed(2)
		);
		grossNetOutput.textContent = netAmountResult.toLocaleString('de-DE', { style: 'currency', currency: 'EUR' });
		vatAmountOutput.textContent = (
			netGrossAmountInput - netAmountResult
		).toLocaleString('de-DE', { style: 'currency', currency: 'EUR' });
	} else if (rdBtnNetGross[1].checked && rdBtnVatRate[1].checked) {
		// 7% MwSt abziehen
		let netAmountResult = Number(
			((netGrossAmountInput * 100) / 107).toFixed(2)
		);
		grossNetOutput.textContent = netAmountResult.toLocaleString('de-DE', { style: 'currency', currency: 'EUR' });
		vatAmountOutput.textContent = (
			netGrossAmountInput - netAmountResult
		).toLocaleString('de-DE', { style: 'currency', currency: 'EUR' });
	}
});
