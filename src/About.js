const About = () => {
  return (
    <main className="col1of1">
      <h1>About</h1>
      <p>AlgorithmOcean was created by me, Kay Rubio, a computer science student at Framingham State University as part of an independent study course practicing my skills in JavaScript, React, Django, and web accessibility.  I&#39;m in the process of making the site fully accessible by screen-readers and keyboard navigation. </p>
      <br /><p>Practice your sorting skills from the home page, or create an account, login, and practice to earn points!  I&#39;ve set up the backend to store your account information and points earned in a PostgreSQL database via Heroku. </p>
      <br /><p>My goal is to someday expand to many more algorithms as well as adding teacher accounts that will allow teachers to create classes and assign students homework and quizzes.  I also hope to someday host the front- and back-end from the same domain name to resolve some of the CSRF/CORS issues that come up with login in Safari. </p>
      <br /><p>I currently work in front-end web development with an emphasis on accessibility in educational software at Curriculum Associates.  You can learn more about me in general by visiting my <a href='https://www.k-rubio.com/'>digital portfolio</a> or my <a href='https://www.linkedin.com/in/kay-sweeney-rubio-731abb114?trk=people-guest_people_search-card'>LinkedIn.</a></p>
      <br /><p>Cheers!</p>
      <p>Kay Rubio</p>
    </main>
  );
}
 
export default About;