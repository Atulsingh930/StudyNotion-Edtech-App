export const ACCOUNT_TYPE = {
    STUDENT: "Student",
    INSTRUCTOR: "Instructor",
    ADMIN: "Admin",
  }
  
  export const COURSE_STATUS = {
    DRAFT: "Draft",
    PUBLISHED: "Published",
  }

export const convertToIST = (utcTimestamp)=> {
  // Create a Date object from the UTC timestamp
  const date = new Date(utcTimestamp);

  // Convert the date to IST
  date.setHours(date.getHours() + 5); // Add 5 hours to convert from UTC to IST
  date.setMinutes(date.getMinutes() + 30); // Add 30 minutes for IST's offset

  // Format the date as "Month Day, Year | Hour:Minute AM/PM"
  const options = {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      hour12: true,
  };
  let istDate = date.toLocaleString('en-US', options);
  istDate = istDate.split('at').join('|')

  return istDate;
}

export const convertSeconds = (totalSeconds)=>{
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  let formattedTime = "";

  if (hours > 0) {
    formattedTime += `${hours}h `;
  }

  if (minutes > 0 || hours > 0) {
    formattedTime += `${minutes}m `;
  }

  formattedTime += `${seconds}s`;

  return formattedTime;
}

export const courseDuration = (couresContent)=>{
    let totalSections = 0;
    let totalSubSections = 0;
    let totalDuration = 0;
    let sectionTimeArray = [];
    for (const section of couresContent) {
      let intialData = 0;

        totalSections++; // Increment section count
        totalSubSections += section.subSection.length; // Add subsection count
        
        // Calculate total duration
        for (const subsection of section.subSection) {
            intialData += subsection.timeDuration;
        }sectionTimeArray.push(intialData)
        totalDuration+=intialData
    }
    // console.log(totalDuration, totalSections, totalSubSections, sectionTimeArray);
    const data = {
        totalSections,
        totalSubSections,
        totalDuration,
        sectionTimeArray
    }
    return data
}

