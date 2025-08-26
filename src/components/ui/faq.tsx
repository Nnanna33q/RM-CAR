import { AiOutlineQuestion } from "react-icons/ai";
import { CurveDividerFaq } from "./divider";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "./accordion";

const faqs = [
    {
        key: '1',
        heading: 'What time does RM Car Sales open and close?',
        content: 'RM Car Sales is open Monday to Friday from 9:00 AM to 8:00 PM, Saturday from 9:00 AM to 6:00 PM, and Sunday from 10:30 AM to 4:00 PM.'
    },
    {
        key: '2',
        heading: 'Where can I find RM Car Sales?',
        content: 'Based in Merseyside, RM Car Sales is located at Triumph Way, Liverpool, L24 9GQ. View directions below.'
    },
    {
        key: '3',
        heading: 'What services can I get from RM Car Sales?',
        content: 'RM Car Sales offers car buying, home delivery, and contactless transactions. For tailored enquiries, feel free to get in touch with us for specific questions.'
    },
    {
        key: '4',
        heading: 'Do you buy cars as well as sell them',
        content: 'Yes. At RM Car Sales, we buy cars directly from customers, either as part-exchange when you purchase a new vehicle or as an outright sale. Our team offers fair valuations to make the process quick and straightforward.'
    }
]

export default function Faqs() {
    return (
        <div className="relative px-4 py-30 md:px-6 md:py-45 lg:px-10 lg:py-45 bg-primary">
            <CurveDividerFaq />
            <div className="text-start pb-8 sm:pb-12 overflow-hidden flex flex-col gap-y-1 sm:gap-y-6">
                <div className="what-they-say-animate text-accent-color flex items-center border border-black rounded-full px-4 py-1 w-[fit-content] bg-accent-dark">
                    <div className='animate-pulse'><AiOutlineQuestion /></div>
                    <div className="text-sm pl-2">Questions & Answers</div>
                </div>
                <h1 className="what-they-say-animate text-secondary text-2xl/15 sm:text-2xl md:text-4xl/15 lg:text-4xl/15 font-bold">Frequently Asked Questions</h1>
                <p className="what-they-say-animate text-medium-gray text-md md:text-md lg:text-lg">We’ve gathered the most frequent questions to make your car buying easier</p>
            </div>
            <div
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-y-8 sm:gap-x-8 lg:gap-x-4">
                {faqs.map(f => {
                    return (
                        <Accordion key={f.key} type="single" collapsible>
                            <AccordionItem value={f.key} className="">
                                <AccordionTrigger className="text-very-light-gray text-base px-4 border border-very-dark-gray">{f.heading}</AccordionTrigger>
                                <AccordionContent className="text-medium-gray text-base p-4 border border-very-dark-gray border-t-0">
                                    {f.content}
                                </AccordionContent>
                            </AccordionItem>
                        </Accordion>
                    )
                })}
            </div>
        </div>
    )
}