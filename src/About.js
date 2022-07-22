const About = () => {
  return (
    <main className="col1of1">
      <h1>About</h1>
      <br /><p>AlgorithmOcean is an app I created for an independent study course at Framingham State University from April - July 2022.  It&#39;s the first free, online, interactive algorithm-learning resource.</p>
      <br /><p>During some preliminary research on online resources to learn algorithms, I discovered that there are only 3 types of resources available: non-interactive videos, costly university courses, or coding IDE websites</p>
      <br /><p>For students new to learning computer science, there&#39;s a need for a free, interactive, non-coding website that allows students to perform algorithms live on screen and get immediate feedback on their performance, as well as directly access educational videos.  AlgorithmOcean begins to fill this gap with lessons on the first 3 sorting algorithms computer science students learn: bubble sort, insertion sort, and selection sort.</p>
      <br /><p>I currently work in front-end web development with an emphasis on accessibility in educational software at Curriculum Associates.  You can learn more about me in general by visiting my:</p>
      <br /><h4 className='center'><a href='https://k-rubio.herokuapp.com/'>Digital Portfolio</a>&nbsp;&nbsp;&nbsp;&nbsp;<a href='https://www.linkedin.com/in/kay-rubio-731abb114/'>LinkedIn</a></h4>

      <br /><h2>Design</h2>
      <br /><p>By connecting algorithms with fun facts about how they can be used in science, I hope to bring out the relevance and make the site rewarding for high school students and young adults. Inspired by self-learning sites like <a href='https://www.duolingo.com/'>Duolingo</a>, I also felt that a set of characters congratulating users when they get answers correct would help motivate students to persevere through increasingly difficult algorithms that I hope to program in the future.</p>
      <br /><p>After binge watching some nature shows on Netflix, I chose an ocean science theme, with the iconic Fibonacci numbers on a nautilus shell on the home page.  I created images in <a href="https://www.canva.com/">Canva</a> and designed the app in PowerPoint before beginning coding.  I also added a button in the nav bar that allows users to change the color scheme.</p>
      <br /><h2>React Front End</h2>
      <br /><h3>Setup</h3>
      <br /><p>I created the front end of the application using the <a href="https://reactjs.org/">React</a> library and <a href="https://nodejs.org/en/">NodeJS</a>.  This ensured the app re-renders components quickly leading to a seamless interactive user experience.  I started with <a href="https://create-react-app.dev/">create-react-app</a> and added additional <a href="https://www.npmjs.com/">npm</a> packages including <a href="https://www.npmjs.com/package/react-aria-live">react-aria-live</a> (for screen reader support), <a href="https://www.npmjs.com/package/axios">axios</a> (for GET requests), and others.</p>
      <br /><h3>Lesson page&#39;s core features</h3>
      <br /><p>The lesson page is where the magic happens.  Users can perform one of 3 sorting algorithms: selection, bubble, or insertion. In the background the program generates an array of random numbers and performs the sorting algorithm on the array, storing the program&#39;s moves in a program moves stack. If the randomly generated array took less than 4 moves to sort, the program generates a new one until a slightly more difficult one is generated. This ensures that although array generation is random, users will always receive an array that requires at least 3 moves to sort.</p>
      <br /><p>The unsorted array appears for the user in a canvas element on screen.  The user clicks on elements to move them around via a swap or insertion mechanism. I created swap and insert the animations using the Create JS library.  Screen reader users are notified via a live message to supplement the visual experience.  User moves are stored in a user moves stack which is printed as a list on the screen, so the user can keep track of what they&#39;ve done so far.</p>
      <br /><h3>Additional leasson features</h3>
      <br /><p>Users can undo their moves with the undo button in the toolbox. The undo button removes a move from the top of the stack and performs an animation to show the undoing of that move. Screen reader users are notified via live message. A maximum of 18 user moves per lesson are allowed.</p>
      <br /><p>In the toolbox, there are also buttons for &#39;Mark sorted,&#39; &#39;Show me a video,&#39; &#39;Help,&#39; and &#39;Submit.&#39; Mark sorted allows users to change the background color of array elements. They can use this to help them keep track of the sorted vs. unsorted section of the array. Cursor icons change, depending on whether the user is using the swap, insert, or mark sorted tool to interact with array elements on the canvas. Using &#39;mark sorted&#39; is optional, and not evaluated when the answer is submitted.</p>
      <br /><p>When &#39;Show me a video&#39; is selected, a modal displays with an educational video from YouTube explaining how to do the sort. When &#39;Help&#39; is clicked, a help modal appears with directions and arrows showing the user how to interact with the different components on screen (also appears by default when lesson first loads). Screen-reader users receive additional directions from the help modal.</p>
      <br /><p>When the array is sorted, the submit button in the toolbox becomes active.  When clicked, a feedback modal appears, telling the user if their answer was correct or not.  The program compares the moves in the program moves stack with the user moves stack to determine if the algorithm was performed correctly.  If incorrect, users are offered a help video to learn more about how to perform the sort.</p>
      <br /><h2>Back End with Django</h2>
      <br /><p>I created a back end using <a href="https://www.djangoproject.com/">Django</a> that stores user account information, allows users to login, and stores practice lesson scores. From the front end, users can create an account, which is sent to the back end via HTML POST request and stored as a user account in an <a href="https://www.postgresql.org/">PostgreSQL</a> database.  Then users can log in from the front end, which makes a call to authenticate the user on the back end in Django.  If authentication is successful, the back end sends user account information which the front-end stores in browser local storage and the user is redirected to the dashboard.</p>
      <br /><p>The dashboard displays practice scores that the user has accrued by correctly performing algorithms. When the dashboard loads, the front end makes an HTML POST request to Django to retrieve practice scores for the user.  When the user performs an algorithm correctly, an updated score is sent to the back end for storage in the database via an HTML POST or PUT request.</p>
      <br /><h2>Accessibility</h2>
      <br /><p>Following <a href="https://www.w3.org/WAI/ARIA/apg/">ARIA specifications</a> I strived to make the app accessible by keyboard navigation and for screen reader users.  I used semantic HTML wherever possible, made sure buttons and images have proper labels and alt text, and ensured elements are in a logical order in the DOM.  I added live announcements to notify screen reader users about animations, login and account creation, and form validation errors.  On the lesson page, I moved focus to modals when they open, and hid the rest of the lesson until the modal was closed to avoid confusion.</p>
      <br /><p>More accessibility work is in progress.  The canvas part of the lesson (the most important part) is not yet accessible via keyboard navigation or screen reader.  I&#39;m working on incorporating the <a href="https://github.com/CurriculumAssociates/createjs-accessibility">Create JS Accessibility Module</a> so that the whole site is accessible.</p>
      <br /><h2>Development Process and Going Live</h2>
      <br /><p>I used local git and GitHub for source control with separate repositories for the front end and back end.  I deployed the front and back end of the application on Heroku on these domains:</p>
      <br /><p><a href="https://algorithmocean.herokuapp.com/">https://algorithmocean.herokuapp.com/</a></p>
      <br /><p><a href="https://algorithmoceanbackend.herokuapp.com/admin/">https://algorithmoceanbackend.herokuapp.com/admin/</a></p>
      <br /><p>Using the admin login on the backend I can view and update users, and the other SQL tables I created with the Django interface.</p>
      <br /><h2>Future directions</h2>
      <br /><h3>Algorithmic expansion</h3>
      <br /><p>Expanding the number of algorithms covered would vastly improve the educational utility of the site for users and I hope to program more complex algorithms in the future.</p>
      <br /><h3>Backend expansion</h3>
      <br /><p>There&#39;s a lot of room for growth on the back end.  Communicating between Django and React was challenging due to cross-domain CSRF and CORS issues.  For instance, Safari users need to disable the &#39;Prevent Cross Site Tracking&#39; setting before logging in. I hope to improve the integration in the future by hosting the front and back end via the same domain name.</p>
      <br /><h3>Educational expansion</h3>
      <br /><p>I&#39;d like to distinguish teacher accounts from student accounts, and tie students to teachers using class codes.  Teachers could create assignments for their classes that would show up on their students&#39; dashboards. Grades would be stored in the database and available to teachers from a teacher dashboard. This expansion would turn AlgorithmOcean into a full learning site, for free public educational use.</p>



    </main>
  );
}

/*
      <h1>About</h1>
      <p>AlgorithmOcean was created by me, Kay Rubio, a computer science student at Framingham State University as part of an independent study course practicing my skills in JavaScript, React, Django, and web accessibility.  I&#39;m in the process of making the site fully accessible by screen-readers and keyboard navigation. </p>
      <br /><p>Practice your sorting skills from the home page, or create an account, login, and practice to earn points!  I&#39;ve set up the backend to store your account information and points earned in a PostgreSQL database via Heroku. </p>
      <br /><p>My goal is to someday expand to many more algorithms as well as adding teacher accounts that will allow teachers to create classes and assign students homework and quizzes.  I also hope to someday host the front- and back-end from the same domain name to resolve some of the CSRF/CORS issues that come up with login in Safari. </p>
      <br /><p>I currently work in front-end web development with an emphasis on accessibility in educational software at Curriculum Associates.  You can learn more about me in general by visiting my <a href='https://k-rubio.herokuapp.com/'>digital portfolio</a> or my <a href='https://www.linkedin.com/in/kay-rubio-731abb114/'>LinkedIn.</a></p>
      <br /><p>Cheers!</p>
      <p>Kay Rubio</p>
*/
 
export default About;