var inventory = [], transaction = [], category = [], field = {};

//-------------Input Request----------------//
var input_name = "clock";
var input_category = "input_request[1]";
var input_quantity = "input_request[2]";
var input_price = "input_request[3]";
var input_unit = "input_request[4]";
var input_customField = "input_request[5]";
var input_request = [input_name, input_category, input_quantity, input_price, input_unit, input_customField];

//-------------Entry Function----------------//
function inventoryManagement(action, input) {
    switch (action) {
        case "add":
            add(input);
            break;
        case "edit":
            editItem(input);
            break;
        case "remove":
            removeItem(input);
            break;
        case "sale":
            saleItem(input);
            break;
        case "restock":
            restockItem(input);
            break;
        case "search":
            searchInventory(input[0]);
            break;
        case "view":
            viewInventory();
            break;
        case "export":
            exportInventory();
            break;
        case "transactions":
            viewTransactions();
            break;
        case "age":
            viewItemAge();
            break;
        case "import":
            importInventory(input);
            break;
        case "addField":
            addFieldToInventory(input[0]);
            break;
        case "updateField":
            updateCustomField(input);
            break;
        default:
            console.log("Invalid action");
            break;
    }
}


//-------------ADD Into Inventory----------------//
function add(request) 
{
    var item = { 
        name: request.input_name, 
        category: request.input_category, 
        quantity: request.input_quantity, 
        price: request.input_price,
        unit: request.input_unit, 
        addedAt: new Date(), 
        customField: request.input_customField || {} 
    };
    inventory.push(item);
    if (!category.includes(request.input_category)) // If category is not in the list, add it
        category.push(request.input_category);
    transaction.push({ type: "add", item }); // Add transaction
}

//-------------Edit Inventory----------------//
function editItem(itemDetails)
{
    var itemName = itemDetails[0];
    if (inventory[itemName]) 
    {
        transaction.push({ type: "edit", old: inventory[itemName], new: itemDetails.slice(1) }); 
        inventory[itemName] = { 
            ...inventory[itemName], 
            name: itemDetails[1], 
            category: itemDetails[2], 
            quantity: itemDetails[3], 
            price: itemDetails[4], 
            unit: itemDetails[5], 
            addedAt: new Date(), 
            customField: itemDetails[6] || {} 
        }; // Update item
    }
}

//-------------Remove Item from Inventory----------------//
function removeItem(itemDetails)
{
    var itemName = itemDetails[0];
    if (inventory[itemName]) 
    {
        transaction.push({ type: "delete", item: inventory[itemName] }); // 
        inventory.splice(itemName, 1);
        if (inventory[itemDetails[2]] < 10)
            console.log("item removed: " + inventory[itemName].name );
    }
}

//-------------Sale Inventory----------------//
function saleItem(saleDetails)
{
    var itemName = saleDetails[0];
    var quantitySold = saleDetails[2];
    for (let i of inventory) 
    {
        if (i.name === itemName) // If item found in inventory
        {
            if (i.quantity >= quantitySold)  // If enough quantity is available
            {
                i.quantity -= quantitySold; // Deduct quantity
                transaction.push({ type: "sale", item: i, quantitySale: quantitySold, date: new Date() });
                console.log(`Sold ${quantitySold} ${i.unit} of ${i.name}`);
            }
            break;
        }
    }
}

//-------------Restock Inventory----------------//
function restockItem(restockDetails)
{
    var itemName = restockDetails[0];
    var quantityRestocked = restockDetails[1];
    for (let i of inventory) 
    {
        if (i.name === itemName) 
        {
            i.quantity += quantityRestocked;
            transaction.push({ type: "restock", item: i, quantityRestock: quantityRestocked, date: new Date() });
            if (i.quantity < 10)
                console.log("Low Stock Alert: " + i.name + " Current Quantity: " + i.quantity); // Low stock alert
            else
                console.log(`Restocked ${quantityRestocked} ${i.unit} of ${i.name}`);
            break;
        }
    }
}

//-------------Search Inventory----------------//
function searchInventory(searchItem)
{
    console.log(inventory.filter(x => [x.name, x.category, x.price].some(v => v.toString().toLowerCase().includes(searchItem.toLowerCase())))); // Search inventory by name, category, price
}

//-------------View Item Inventory----------------//
function viewInventory()
{
    console.log("=== Inventory ===", inventory);
}

//-------------Export All Inventory----------------//
function exportInventory()
{
    console.log("CSV:\n" + 
            ["Name,Category,Quantity,Price,Unit,AddedAt"].concat(inventory.map(x => Object.values(x).join(','))).join('\n'));
}

//-----------------View All Transactions----------------//
function viewTransactions()
{
    console.log("Transactions:\n", transaction);
}

//-----------------View Item Age----------------//
function viewItemAge()
{
    console.log(inventory.map(x => `${x.name}: ${Math.floor((new Date() - new Date(x.addedAt)) / (1000 * 60 * 60 * 24))}d`).join('\n')); // Calculate item age in days
}

//-----------------Import Inventory----------------//
function importInventory(importData)
{
    importData.input_name.forEach(x => add([x.name, x.category, x.quantity, x.price, x.unit])); // Add items from import data
}

//-----------------Add Field----------------//
function addFieldToInventory(fieldName)
{
    if (!field[fieldName])
        field[fieldName] = null;
}

//-----------------Update Custom Field----------------//
function updateCustomField(customFieldDetails)
{
    var itemName = customFieldDetails[0];
    var fieldKey = customFieldDetails[1];
    var fieldValue = customFieldDetails[2];
    inventory.find(x => x.name === itemName)?.customField[fieldKey] = fieldValue; // Update custom field by searching for item with  
}