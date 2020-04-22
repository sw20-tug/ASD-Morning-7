const sum = require('link to file');

it('renders in table rows based on provided columns', () => {
    const cols = [
        { header: 'Name', name: 'name' },
        { header: 'Preparation time (min)', name: 'preparationTime' },
        { header: 'Cooking time (min)', name: 'cookingTime' },
        { header: 'Type', name: "type" }
    ];
    /*const data = [
       { id: 5, name: 'John', email: 'john@example.com' },
       { id: 6, name: 'Liam', email: 'liam@example.com' },
       { id: 7, name: 'Maya', email: 'maya@example.com', someTest: 10 },
       { id: 8, name: 'Oliver', email: 'oliver@example.com', hello: 'hello world' },
       { id: 25, name: 'Amelia', email: 'amelia@example.com' }
    ]; */  // Shallow render Data Table
    //const container = shallow(<DataTable data={data} cols={cols} />);   // There should be ONLY 1 table element
    const table = container.find('tr');
    expect(table).toHaveLength(1);   // The table should have ONLY 1 thead element
    const thead = table.find('th');
    expect(thead).toHaveLength(1);   // The number of th tags should be equal to number of columns
    const headers = thead.find('tr');
    expect(headers).toHaveLength(cols.length);   // Each th tag text should equal to column header

    headers.forEach((th, idx) => {
        expect(th.text()).toEqual(cols[idx].header);
    });   // The table should have ONLY 1 tbody tag
    const tbody = table.find('tbody');
    expect(tbody).toHaveLength(1);   // tbody tag should have the same number of tr tags as data rows
    const rows = tbody.find('tr');
    expect(rows).toHaveLength(data.length);   // Loop through each row and check the content
    rows.forEach((tr, rowIndex) => {
        const cells = tr.find('td');
        expect(cells).toHaveLength(cols.length);
        expect(cells.at(0).text()).toEqual("Pizza");
        expect(cells.at(1).text()).toEqual("45");
        expect(cells.at(2).text()).toEqual("125");
        expect(cells.at(3).text()).toEqual("italian Dish");
    });
});