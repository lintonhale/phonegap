var db;
var dbCreated = false;

var scroll = new iScroll('wrapper', { vScrollbar: false, hScrollbar:false, hScroll: false });

onDeviceReady();

function onDeviceReady() {
    db = window.openDatabase("EmployeeDirectoryDB", "1.0", "PhoneGap Demo", 200000);
    if (dbCreated)
    	db.transaction(getEmployees, transaction_error);
    else
    	db.transaction(populateDB, transaction_error, populateDB_success);

// TESTING added second db
    db2 = window.openDatabase("ItemsDB", "1.0", "PhoneGap Items", 200000);
    if (db2Created)
    	db2.transaction(getItems, transaction_error);
    else
    	db2.transaction(populateDB2, transaction_error, populateDB2_success);

}

function transaction_error(tx, error) {
	$('#busy').hide();
    alert("Database Error: " + error);
}

function populateDB_success() {
	dbCreated = true;
    db.transaction(getEmployees, transaction_error);
}

// TESTING
function populateDB2_success() {
	db2Created = true;
    db2.transaction(getItems, transaction_error);
}

function getEmployees(tx) {
	var sql = "select e.id, e.firstName, e.lastName, e.title, e.picture, count(r.id) reportCount " + 
				"from employee e left join employee r on r.managerId = e.id " +
				"group by e.id order by e.lastName, e.firstName";
	tx.executeSql(sql, [], getEmployees_success);
}

// TESTING
function getItems(tx) {
	var sql = "select i.id, i.firstName, i.lastName, i.title, i.picture, count(r.id) reportCount " + 
				"from item i left join item r on r.managerId = i.id " +
				"group by i.id order by i.lastName, i.firstName";
	tx.executeSql(sql, [], getItems_success);
}
	
function getEmployees_success(tx, results) {
	$('#busy').hide();
    var len = results.rows.length;
    for (var i=0; i<len; i++) {
    	var employee = results.rows.item(i);
		$('#employeeList').append('<li><a href="employeedetails.html?id=' + employee.id + '">' +
				'<img src="pics/' + employee.picture + '" class="list-icon"/>' +
				'<p class="line1">' + employee.firstName + ' ' + employee.lastName + '</p>' +
				'<p class="line2">' + employee.title + '</p>' +
				'<span class="bubble">' + employee.reportCount + '</span></a></li>');
    }
	setTimeout(function(){
		scroll.refresh();
	},100);
	db = null;
}

// TESTING
function getItems_success(tx, results) {
	$('#busy').hide();
    var len = results.rows.length;
    for (var i=0; i<len; i++) {
    	var this_item = results.rows.item(i);
		$('#employeeList').append('<li><a href="itemdetails.html?id=' + this_item.id + '">' +
				'<img src="pics/' + this_item.picture + '" class="list-icon"/>' +
				'<p class="line1">' + this_item.firstName + ' ' + this_item.lastName + '</p>' +
				'<p class="line2">' + this_item.title + '</p>' +
				'<span class="bubble">' + this_item.reportCount + '</span></a></li>');
    }
	setTimeout(function(){
		scroll.refresh();
	},100);
	db = null;
}

function populateDB(tx) {
	$('#busy').show();
	tx.executeSql('DROP TABLE IF EXISTS employee');
	var sql = 
		"CREATE TABLE IF NOT EXISTS employee ( "+
		"id INTEGER PRIMARY KEY AUTOINCREMENT, " +
		"firstName VARCHAR(50), " +
		"lastName VARCHAR(50), " +
		"title VARCHAR(50), " +
		"department VARCHAR(50), " + 
		"managerId INTEGER, " +
		"city VARCHAR(50), " +
		"officePhone VARCHAR(30), " + 
		"cellPhone VARCHAR(30), " +
		"email VARCHAR(30), " +
		"picture VARCHAR(200))";
    tx.executeSql(sql);

    tx.executeSql("INSERT INTO employee (id,firstName,lastName,managerId,title,department,officePhone,cellPhone,email,city,picture) VALUES (12,'Steven','Wells',4,'Software Architect','Engineering','617-000-0012','781-000-0012','swells@fakemail.com','Boston, MA','steven_wells.jpg')");
    tx.executeSql("INSERT INTO employee (id,firstName,lastName,managerId,title,department,officePhone,cellPhone,email,city,picture) VALUES (11,'Amy','Jones',5,'Sales Representative','Sales','617-000-0011','781-000-0011','ajones@fakemail.com','Boston, MA','amy_jones.jpg')");
    tx.executeSql("INSERT INTO employee (id,firstName,lastName,managerId,title,department,officePhone,cellPhone,email,city,picture) VALUES (10,'Kathleen','Byrne',5,'Sales Representative','Sales','617-000-0010','781-000-0010','kbyrne@fakemail.com','Boston, MA','kathleen_byrne.jpg')");
    tx.executeSql("INSERT INTO employee (id,firstName,lastName,managerId,title,department,officePhone,cellPhone,email,city,picture) VALUES (9,'Gary','Donovan',2,'Marketing','Marketing','617-000-0009','781-000-0009','gdonovan@fakemail.com','Boston, MA','gary_donovan.jpg')");
    tx.executeSql("INSERT INTO employee (id,firstName,lastName,managerId,title,department,officePhone,cellPhone,email,city,picture) VALUES (8,'Lisa','Wong',2,'Marketing Manager','Marketing','617-000-0008','781-000-0008','lwong@fakemail.com','Boston, MA','lisa_wong.jpg')");
    tx.executeSql("INSERT INTO employee (id,firstName,lastName,managerId,title,department,officePhone,cellPhone,email,city,picture) VALUES (7,'Paula','Gates',4,'Software Architect','Engineering','617-000-0007','781-000-0007','pgates@fakemail.com','Boston, MA','paula_gates.jpg')");
    tx.executeSql("INSERT INTO employee (id,firstName,lastName,managerId,title,department,officePhone,cellPhone,email,city,picture) VALUES (5,'Ray','Moore',1,'VP of Sales','Sales','617-000-0005','781-000-0005','rmoore@fakemail.com','Boston, MA','ray_moore.jpg')");
    tx.executeSql("INSERT INTO employee (id,firstName,lastName,managerId,title,department,officePhone,cellPhone,email,city,picture) VALUES (6,'Paul','Jones',4,'QA Manager','Engineering','617-000-0006','781-000-0006','pjones@fakemail.com','Boston, MA','paul_jones.jpg')");
    tx.executeSql("INSERT INTO employee (id,firstName,lastName,managerId,title,department,officePhone,cellPhone,email,city,picture) VALUES (3,'Eugene','Lee',1,'CFO','Accounting','617-000-0003','781-000-0003','elee@fakemail.com','Boston, MA','eugene_lee.jpg')");
    tx.executeSql("INSERT INTO employee (id,firstName,lastName,managerId,title,department,officePhone,cellPhone,email,city,picture) VALUES (4,'John','Williams',1,'VP of Engineering','Engineering','617-000-0004','781-000-0004','jwilliams@fakemail.com','Boston, MA','john_williams.jpg')");
    tx.executeSql("INSERT INTO employee (id,firstName,lastName,managerId,title,department,officePhone,cellPhone,email,city,picture) VALUES (2,'Julie','Taylor',1,'VP of Marketing','Marketing','617-000-0002','781-000-0002','jtaylor@fakemail.com','Boston, MA','julie_taylor.jpg')");
    tx.executeSql("INSERT INTO employee (id,firstName,lastName,managerId,title,department,officePhone,cellPhone,email,city,picture) VALUES (1,'James','King',0,'President and CEO','Corporate','617-000-0001','781-000-0001','jking@fakemail.com','Boston, MA','james_king.jpg')");
}

function populateDB2(tx) {
	$('#busy').show();
	tx.executeSql('DROP TABLE IF EXISTS item');
	var sql = 
		"CREATE TABLE IF NOT EXISTS item ( "+
		"id INTEGER PRIMARY KEY AUTOINCREMENT, " +
		"firstName VARCHAR(50), " +
		"lastName VARCHAR(50), " +
		"title VARCHAR(50), " +
		"department VARCHAR(50), " + 
		"managerId INTEGER, " +
		"city VARCHAR(50), " +
		"officePhone VARCHAR(30), " + 
		"cellPhone VARCHAR(30), " +
		"email VARCHAR(30), " +
		"picture VARCHAR(200))";
    tx.executeSql(sql);

    tx.executeSql("INSERT INTO item (id,firstName,lastName,managerId,title,department,officePhone,cellPhone,email,city,picture) VALUES (12,'Items','Items!',4,'Software Architect','Engineering','617-000-0012','781-000-0012','lintonhale@mmail.com','Sebastopol, CA','steven_wells.jpg')");
    tx.executeSql("INSERT INTO item (id,firstName,lastName,managerId,title,department,officePhone,cellPhone,email,city,picture) VALUES (11,'Amy','Jones',5,'Sales Representative','Sales','617-000-0011','781-000-0011','ajones@fakemail.com','Boston, MA','amy_jones.jpg')");
    tx.executeSql("INSERT INTO item (id,firstName,lastName,managerId,title,department,officePhone,cellPhone,email,city,picture) VALUES (10,'Kathleen','Byrne',5,'Sales Representative','Sales','617-000-0010','781-000-0010','kbyrne@fakemail.com','Boston, MA','kathleen_byrne.jpg')");
    tx.executeSql("INSERT INTO item (id,firstName,lastName,managerId,title,department,officePhone,cellPhone,email,city,picture) VALUES (9,'Gary','Donovan',2,'Marketing','Marketing','617-000-0009','781-000-0009','gdonovan@fakemail.com','Boston, MA','gary_donovan.jpg')");
    tx.executeSql("INSERT INTO item (id,firstName,lastName,managerId,title,department,officePhone,cellPhone,email,city,picture) VALUES (8,'Lisa','Wong',2,'Marketing Manager','Marketing','617-000-0008','781-000-0008','lwong@fakemail.com','Boston, MA','lisa_wong.jpg')");
}
