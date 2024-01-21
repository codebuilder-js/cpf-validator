function ValidateCPF(cpf) {
  Object.defineProperty(this, 'cleanCPF', {
    enumerable: true,

    get: function() {
      return cpf.replace(/\D+/g, '');
    }
  });
}

ValidateCPF.prototype.validate = function() {
  if(typeof this.cleanCPF === 'undefined') return false;
  if(this.cleanCPF.length !== 11)          return false;
  if(this.sequential())                    return false;

  const partialCPF = this.cleanCPF.slice(0, -2);
  const firstDigit = this.createDigit(partialCPF);
  const secondDigit = this.createDigit(partialCPF + firstDigit);
  const newCPF = partialCPF + firstDigit + secondDigit;

  return newCPF === this.cleanCPF;
};

ValidateCPF.prototype.createDigit = function(partialCPF) {
  const cpfArray = Array.from(partialCPF);
  let regressive = cpfArray.length + 1;
  const total = cpfArray.reduce((ac, index) => {
    ac += (regressive * index);
    regressive--;
    return ac;
  }, 0);

  const digit = 11 - (total % 11);

  return digit > 9 ? '0' : String(digit);
};

ValidateCPF.prototype.sequential = function() {
  const sequence = this.cleanCPF[0].repeat(this.cleanCPF.length);

  return sequence === this.cleanCPF;
};

const cpfList = ['705.484.450-52', '070.987.720-03', '123.456.789-09', '123.456.789-10', '111.111.111-11'];

const cpf = new ValidateCPF(cpfList[0]);

if(cpf.validate()) {
  console.log('Valid CPF!');
} else {
  console.log('Invalid CPF!');
}