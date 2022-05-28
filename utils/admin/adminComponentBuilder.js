const { selectMenuOptionBuilder } = require('./adminSelectMenuOptionBuilder.js');
const { buttonBuilder } = require('./adminButtonBuilder.js');

const components = async (opt, bool) => {
	const selection = opt.split("_"); //add_discord -> "add", "discord"
	switch(selection[0]) {
		case 'main':
			return {
				type: 1, 
				components: [{ 
					type: 3, 
					custom_id: "mainMenuSelection",	
					options: await selectMenuOptionBuilder('main'), 
					placeholder: "Please select an option"	
				}]
			}
		
		case 'enter':
			switch(selection[1]) {
				case 'postrules':
					return {
						type: 1,
						components: await buttonBuilder(selection[1])
					}
				
				default:
					return {
						type: 1,
						components: [{
							type: 3,
							custom_id: "edit",
							options: await selectMenuOptionBuilder(`view_${selection[1]}`),
							placeholder: "Please choose a rule"
						}]
					}	
			}
		
		case 'add':
			return {
				type: 1,
				components: await buttonBuilder(opt, bool)
			}

		case 'edit':
			return {
				type: 1,
				components: await buttonBuilder(opt, bool)
			}
		
		case 'duplicate':
			return {
				type: 1,
				components: await buttonBuilder(opt)
			}

		case 'delete':
			return {
				type: 1,
				components: await buttonBuilder(opt)
			}

		case 'postrulessuccess':
			return {
				type: 1,
				components: await buttonBuilder(opt)
			}

		default:
			return {
				type: 1,
				components: await buttonBuilder()
			}
	}
};

module.exports = {
  components
}