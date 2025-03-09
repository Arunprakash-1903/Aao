const JobCard = ({ job }) => {
    const {
      jobTitle,
      company,

      Experience,
      salary,
      location,
      jobDescription,
      
      createdAt,
    } = job;
console.log(createdAt);


    function calculateDaysAgo(dateString: string): number {
        const date=dateString.replace("T"," ")
      //  console.log("-------"+date);
        
        const givenDate = new Date(date);
        const today = new Date();
    //  console.log(givenDate)
        // Check for valid date
        if (isNaN(givenDate.getTime())) {
          throw new Error("Invalid date string");
        }
      
        // Calculate the difference in milliseconds
        const differenceInMs = today.getTime() - givenDate.getTime();
      
        // Convert the difference from milliseconds to days
        const daysAgo = Math.floor(differenceInMs / (1000 * 60 * 60 * 24));
      
        return daysAgo;
      }
    return (
      <div className="border rounded-lg p-4 bg-white shadow-md max-w-md">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h3 className="text-lg font-semibold">{jobTitle}</h3>
            <p className="text-sm text-gray-600">{company}</p>
          </div>
          
        </div>
  
        {/* Job Details */}
        <div className="flex justify-between text-sm text-gray-600 mt-2">
          <p>🕒 {Experience } yrs</p>
          <p>💰 {salary }</p>
          <p>📍 {location}</p>
        </div>
  
        {/* Description */}
        {/* <p className="text-sm text-gray-800 mt-2">{jobDescription}</p> */}
  
    
  
        {/* Footer */}
        <div className="flex justify-between items-center border-t mt-4 pt-2">
          <p className="text-xs text-gray-500">{calculateDaysAgo(createdAt)} Days Ago</p>
          <div className="flex gap-2">
    
          </div>
        </div>
      </div>
    );
  };
  
  export default JobCard;
  