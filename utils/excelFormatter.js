import * as XLSX from "xlsx"

export const convertToExcel = (data, sheetName, filename) => {
    try {
        // create a new workbook
        const workbook = XLSX.utils.book_new()

        // convert json to worksheet
        const worksheet = XLSX.utils.json_to_sheet(data)

        // add worksheet to workbook
        XLSX.utils.book_append_sheet(workbook, worksheet, sheetName)

        // generate buffer
        const buffer = XLSX.write(workbook, {type: "buffer", bookType: "xlsx"})

        return {
            buffer,
            filename: `${filename}_${Date.now()}.xlsx`,
            mimetype: "application/vnd.openxmlformats-officedocument.spreadsheethtml.sheet"
        }
    } catch (error) {
        throw new Error(`Error converting to Excel: ${error.message}`)
    }
}