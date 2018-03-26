'use strict';
function validCpf(strCPF) {
	var Soma;
	var Resto;
	Soma = 0;
	if (strCPF == "00000000000") return false;

	for (var i = 1; i <= 9; i++) Soma = Soma + parseInt(strCPF.substring(i - 1, i)) * (11 - i);
	Resto = (Soma * 10) % 11;

	if ((Resto == 10) || (Resto == 11)) Resto = 0;
	if (Resto != parseInt(strCPF.substring(9, 10))) return false;

	Soma = 0;
	for (i = 1; i <= 10; i++) Soma = Soma + parseInt(strCPF.substring(i - 1, i)) * (12 - i);
	Resto = (Soma * 10) % 11;

	if ((Resto == 10) || (Resto == 11)) Resto = 0;
	if (Resto != parseInt(strCPF.substring(10, 11))) return false;
	return true;
}
module.exports = (sequelize, DataTypes) => {
	var Client = sequelize.define('Client', {
		id: {
			type: DataTypes.INTEGER,
			primaryKey: true,
			autoIncrement: true
		},
		cpf: {
			type: DataTypes.STRING(11),
			allowNull: false,
			validate: {
				isEven(value) {
					if (!validCpf(value)) {
						throw new Error('Cpf invalid!');
					}
				}
			}
		},
		city: {
			type: DataTypes.STRING,
			allowNull: false
		},
		address: {
			type: DataTypes.STRING,
			allowNull: false
		},
		addressNumber: {
			type: DataTypes.INTEGER,
			allowNull: false
		},
		neighborhood: {
			type: DataTypes.STRING,
			allowNull: false
		},
		state: {
			type: DataTypes.STRING(3),
			allowNull: false
		},
		zipCode: {
			type: DataTypes.STRING,
			allowNull: false
		},
		complement: {
			type: DataTypes.STRING,
			allowNull: true
		},
		name: {
			type: DataTypes.STRING(100),
			allowNull: false
		},
		email: {
			type: DataTypes.STRING,
			allowNull: false,
			validate: {
				is: /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/   
			}
		},
		maritalStatus: {
			type: DataTypes.ENUM('Not married', 'Married'),
			 allowNull: false
		}
	},
		{
			indexes: [
				{
					unique: true,
					fields: ['address']
				},
				{
					unique: true,
					fields: ['cpf']
				}
			]
		});
	Client.associate = function (models) {
		// associations can be defined here
		Client.hasMany(models.PhoneNumber);
	};
	return Client;
};