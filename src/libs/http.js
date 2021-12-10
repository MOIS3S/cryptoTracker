
exports.get = async function(url){
		try {
			let req = await fetch(url, {
				headers: {'X-CMC_PRO_API_KEY': '48e15dc3-5a33-49ac-8b3e-37675a90a415' }
			});
			let json = await req.json();
			return json;
		} catch (err) {
			console.log("http get method err: ", err);
			throw Error(err)
		}
	}
	
exports.post = async function(url, body){
		try{
			let req = await fetch(url,{
				method: 'POST',
				body 
				});
			let json = await req.json();
			return json
		} catch (err){
			console.log("http post method err: ", err);
		}
	}


