var ctx = require("../context.js");
var Client = ctx.Client;
var PhoneNumber = ctx.PhoneNumber;
var repositoryBase = require("./base/repositoryBase.js")(Client);
module.exports = {
	...repositoryBase,
	GetAll: callback => {
		Client
			.findAll({
				include: [PhoneNumber]
			})
			.then(result => {
				callback(null, result);
			})
			.catch(err => {
				callback(err, null);
			});
	},
	GetById: (id, callback) => {
		Client
			.findById(id, { include: [PhoneNumber]})
			.then(result => {
				callback(null, result);
			})
			.catch(err => {
				callback(err, null);
			});
	},
	Save: (obj, callback) => {
		Client
			.build(obj)
			.save()
			.then(result => {
				if (obj.PhoneNumbers && obj.PhoneNumbers.length > 0) {
					PhoneNumber.bulkCreate(obj.PhoneNumbers)
						.then(phones => {
							result.setPhoneNumbers(phones, {save:true})
								.then(_result => {
									callback(null, _result);
								})
								.catch(err => {
									callback(err, null);
								});
						})
						.catch(err => {
							callback(err, null);
						});
				}
				else
					callback(null, result);
			})
			.catch(err => {
				callback(err, null);
			});
	},
	Update: (obj, callback) => {
		var client = Client.build(obj, { isNewRecord: false });
		client
			.update(obj, { where: { id: obj.id}})
			.then(result => {
				if (obj.PhoneNumbers && obj.PhoneNumbers.length > 0) {
					PhoneNumber.bulkCreate(obj.PhoneNumbers)
						.then(phones => {
							client.setPhoneNumbers(phones, { save: true })
								.then(_result => {
									callback(null, _result);
								})
								.catch(err => {
									callback(err, null);
								});
						})
						.catch(err => {
							callback(err, null);
						});
				}
				else
					callback(null, result);
			})
			.catch(err => {
				callback(err, null);
			});
	}
};