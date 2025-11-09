import Enquiry from "../schemas/enquiry.js"

export function getEnquiries(tablist: 'All' | 'Pending' | 'Completed', page: number) {
    if (tablist === 'All') {
        return Enquiry.find().sort({ _id: -1 }).skip((page - 1) * 5).limit(5)
    } else if (tablist ===  'Pending') {
        return Enquiry.find({ status: 'Pending' }).sort({ _id: -1 }).skip((page - 1) * 5).limit(5)
    } else {
        return Enquiry.find({ status: 'Completed' }).sort({ _id: -1 }).skip((page - 1) * 5).limit(5)
    }
}

export function countEnquiries(tablist: 'All' | 'Pending' | 'Completed') {
    if(tablist === 'All') {
        return Enquiry.find().countDocuments()
    } else if(tablist === 'Pending') {
        return Enquiry.find({ status: 'Pending' }).countDocuments()
    } else Enquiry.find({ status: 'Completed' }).countDocuments()
}