const buttonBuilder = async (opt, bool) => {
  let selection = opt.split("_"); //add_discord -> "add", "discord"
  console.log("adminButtonBuilderSelection", selection);
  switch(selection[0]) {
    case 'add':
      return [
        { type: 2, style: 3, custom_id: `save_${selection[1]}`, label: 'Save', disabled: bool },
        { type: 2, style: 1, custom_id: selection[2] ? `edit_${selection[1]}_${selection[2]}` : `edit_${selection[1]}`, label: 'Edit' },
        { type: 2, style: 4, custom_id: `return_${selection[1]}`, label: 'Return' }
      ]

    case 'edit':
      return [
        { type: 2, style: 3, custom_id: `save_${selection[1]}`, label: 'Save', disabled: bool },
        { type: 2, style: 1, custom_id: selection[2] ? `edit_${selection[1]}_${selection[2]}` : `edit_${selection[1]}`, label: 'Edit' },
        { type: 2, style: 4, custom_id: `delete_${selection[1]}_${selection[2]}`, label: 'Delete' },
        { type: 2, style: 2, custom_id: `return_${selection[1]}`, label: 'Return' }
      ]

    case 'postrules':
      return [
        { type: 2, style: 3, custom_id: 'postrules', label: 'Yes' },
        { type: 2, style: 4, custom_id: 'main', label: 'Cancel' }
      ]

    case 'postrulessuccess':
      return [
        { type: 2, style: 3, custom_id: 'main', label: 'Ok' }
      ]

    case 'config':
      return [
        { type: 2, style: 3, custom_id: 'edit_config', label: 'Edit' },
        { type: 2, style: 4, custom_id: `return_${selection[1]}`, label: 'Return'}
      ]
    
    case 'duplicate':
      return [
        // { type: 2, style: 1, custom_id: `edit_${selection[1]}`, label: 'Edit' },
        { type: 2, style: 4, custom_id: `return_${selection[1]}`, label: 'Return' }
      ]

    case 'delete':
      return [
        { type: 2, style: 4, custom_id: `delete_confirm_${selection[1]}_${selection[2]}`, label: 'Delete' },
        { type: 2, style: 2, custom_id: `return_${selection[1]}`, label: 'Return'}
      ]
  }
}

module.exports = {
  buttonBuilder
}