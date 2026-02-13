import { useEffect, useState } from "react";
import { Card, Col, Container, Form, Row } from "react-bootstrap";
import playIcon from "../assets/play.png";
import quoteBg from "../assets/pic_3.jpg";
import "./CoursesPage.css";

function CoursesPage() {
  const [courses, setCourses] = useState([]);
  const [topics, setTopics] = useState([]);
  const [sorts, setSorts] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTopic, setSelectedTopic] = useState("");
  const [selectedSort, setSelectedSort] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const queryParams = new URLSearchParams();
    if (searchQuery) queryParams.set("q", searchQuery);
    if (selectedTopic) queryParams.set("topic", selectedTopic);
    if (selectedSort) queryParams.set("sort", selectedSort);

    setIsLoading(true);
    fetch(`https://smileschool-api.hbtn.info/courses?${queryParams}`)
      .then((response) => response.json())
      .then((data) => {
        setCourses(data.courses || []);
        setTopics(data.topics || []);
        setSorts(data.sorts || []);
        if (!searchQuery && data.q) setSearchQuery(data.q);
        if (!selectedTopic && data.topics?.[0]) setSelectedTopic(data.topics[0]);
        if (!selectedSort && data.sorts?.[0]) setSelectedSort(data.sorts[0]);
      })
      .finally(() => setIsLoading(false));
  }, [searchQuery, selectedTopic, selectedSort]);

  return (
    <main className="courses-page">
      <section className="courses-top" style={{ backgroundImage: `linear-gradient(rgba(7,22,41,.78), rgba(7,22,41,.88)), url(${quoteBg})` }}>
        <Container>
          <p className="quote-main">
            " Don't cry because it's over. <span>Smile</span> because it happened. "
          </p>
        </Container>
      </section>

      <section className="form-container">
        <Container>
          <Row className="g-3">
            <Col xs={12} md={4}>
              <Form.Label className="filter-label">KEYWORDS</Form.Label>
              <Form.Control
                placeholder="Search by keywords"
                value={searchQuery}
                onChange={(event) => setSearchQuery(event.target.value)}
              />
            </Col>
            <Col xs={12} md={4}>
              <Form.Label className="filter-label">TOPIC</Form.Label>
              <Form.Select value={selectedTopic} onChange={(event) => setSelectedTopic(event.target.value)}>
                <option value="">Topic</option>
                {topics.map((topicOption) => <option key={topicOption}>{topicOption}</option>)}
              </Form.Select>
            </Col>
            <Col xs={12} md={4}>
              <Form.Label className="filter-label">SORT BY</Form.Label>
              <Form.Select value={selectedSort} onChange={(event) => setSelectedSort(event.target.value)}>
                <option value="">Sort</option>
                {sorts.map((sortOption) => <option key={sortOption}>{sortOption}</option>)}
              </Form.Select>
            </Col>
          </Row>
        </Container>
      </section>

      <Container className="courses-content">
        <p className="courses-count">{isLoading ? "Loading..." : `${courses.length} video${courses.length === 1 ? "" : "s"}`}</p>

        <Row className="g-4">
          {courses.map((course, index) => (
            <Col key={index} xs={12} sm={6} lg={3}>
              <Card className="course-card">
                <div className="thumb-wrap">
                  <Card.Img src={course.thumb_url || course.video_poster} className="course-image" />
                  <img src={playIcon} alt="" className="play-icon" />
                </div>
                <Card.Body>
                  <Card.Title>{course.title || course.user_quote}</Card.Title>
                  <Card.Text>{course.sub_title || course.paragraph}</Card.Text>
                  <p className="course-meta">{course.author || course.username}</p>
                  <div className="course-footer">
                    <div>
                      {[...Array(5)].map((_, idx) => (
                        <span key={idx} className="star">{idx < (course.star || 0) ? "★" : "☆"}</span>
                      ))}
                    </div>
                    <span className="mins">{course.duration || course.minutes}</span>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
    </main>
  );
}

export default CoursesPage;
