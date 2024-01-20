const Table = () => {
    // Its important to wrap the table in a div with the class 'rad-ui-table' so that the table can be styled properly
    // so we created a new class for <table> element as a one off case in pattern when it comes to naming classes/conventions
    // this is because we cant style the table element directly, so we'll need to wrap it in a div and style the div instead

    return <div className='rad-ui-table-wrapper' >
        <table className="rad-ui-table">
            <thead className='rad-ui-table-header' >
                <tr className='rad-ui-table-row'>
                    <th className='rad-ui-table-head'>Column 1</th>
                    <th className='rad-ui-table-head'>Column 2</th>
                </tr>
            </thead>
            <tbody>
                <tr className='rad-ui-table-row'>
                    <td className='rad-ui-table-cell'>Row 1, Column 1</td>
                    <td className='rad-ui-table-cell'>Row 1, Column 2</td>
                </tr>
                <tr className='rad-ui-table-row'>
                    <td className='rad-ui-table-cell'>Row 2, Column 1</td>
                    <td className='rad-ui-table-cell'>Row 2, Column 2</td>
                </tr>
            </tbody>
        </table>
    </div>;
};

export default Table;
