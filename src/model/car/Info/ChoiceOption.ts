export interface ChoiceOption {
  choiceOptionPk: string;
  carPk: string;
  carCountryName: string;
  carBrandName: string;
  carModelName: string;
  carDetailModelName: string;
  choiceOptionName: string;
  choiceOptionPrice: number;
  choiceOptionDescription: string;
  connectChoiceOption: string[];
  removeChoiceOption: string[];
}
