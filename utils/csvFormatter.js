import { Parser } from "json2csv";

export const convertToCSV = (data, filename) => {
    try {
        // extracting field names from the first object
        const fields = data.length > 0 ? Object.keys(data[0]) : []

        // create parser with options
        const parser = new Parser({fields})
        const csv = parser.parse(data)

        return {
            csv,
            filename: `${filename}_${Date.now()}.csv`,
            mimetype: "text/csv"
        }
    } catch (error) {
        throw new Error(`Error converting to csv: ${error.message}`)
    }
}