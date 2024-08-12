export interface CarSpec {
  carPk: string;
  carCountryName: string;
  carBrandName: string;
  carModelName: string;
  carDetailModelName: string;

  carSpecPk: number;
  carHeight: string;
  carWidth: string;
  carWheelbase: string;
  carLength: string;
  carWeight: string;
  trunkSuitcase: string;
  trunkStroller: string;
  trunkGolfBag: string;
  carSeating: string;
  fuelEfficiency: number;
  engineDisplacement: number;
  engineType: string;
  engineTorque: string;
  enginePower: string;
  transmissionInfo: string;
  zeroToHundred: string;
  motorTorque: string;
  motorPower: string;
  motorMaxSpeed: string;
  motorZeroToHundred: string;
  motorBatteryCapacity: string;
  motorCharging: string;
  motorFastCharging: string;
  motorSlowCharging: string;
  motorDrivingRange: string;
}
