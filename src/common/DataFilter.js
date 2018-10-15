class DataFilter {
    static getFilteredData = (filterValue, basedData) => {
        var filteredArr = [];
        basedData.forEach(element => {
            if (element.hoTen.indexOf(filterValue) !== -1) {
            filteredArr.push(element);
            }
        });

        return filteredArr;
    }
}

export default DataFilter;