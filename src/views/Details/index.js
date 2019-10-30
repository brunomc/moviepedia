import React, {Component} from 'react';
import {ScrollView, Image} from 'react-native';
import {Grid, Row, Col, Text, Container, Button, Icon} from 'native-base';
import styles from './styles';
import StarRating from 'react-native-star-rating';
import {connect} from 'react-redux';
import {loadGenres} from '../../ducks/search';
class Details extends Component {
  constructor(props) {
    super(props);
  }
  state = {
    genres: '',
  };
  componentDidMount() {
    this.props.loadGenres(this.props.movie.genre_ids);
  }
  setGenres = name => {
    this.setState({
      genres: name,
    });
  };
  render() {
    return (
      <Container style={styles.container}>
        <Grid>
          <Row size={45} style={styles.header}>
            <Image
              style={{
                flex: 1,
                aspectRatio: 1.5,
                resizeMode: 'stretch',
              }}
              source={{
                uri:
                  'https://image.tmdb.org/t/p/original' +
                  this.props.movie.poster_path,
              }}
            />
          </Row>
          <Row size={55} style={styles.bodyContainer}>
            <ScrollView>
              <Row style={styles.rowSubtitle}>
                <Text style={styles.subtitle}>
                  {this.props.movie && this.props.movie.title}
                </Text>
                <Icon name="search" style={{color: 'white'}} />
              </Row>
              <Row style={styles.rowButtonWatch}>
                <Button rounded style={styles.buttonWatch}>
                  <Text style={styles.buttonWatchText}>Assistir Agora</Text>
                </Button>
                <StarRating
                  disabled
                  maxStars={5}
                  rating={(this.props.movie.vote_average / 10) * 5}
                  starSize={20}
                  fullStarColor="yellow"
                  emptyStarColor="#ddd363"
                />
              </Row>
              <Row style={styles.rowOverview}>
                <Text style={styles.rowOverviewText}>
                  {this.props.movie && this.props.movie.overview}
                </Text>
              </Row>
              <Row>
                <Col style={styles.colActor}>
                  <Image
                    style={{
                      width: 60,
                      height: 60,
                      borderRadius: 50,
                      marginBottom: 5,
                    }}
                    source={{
                      uri: 'https://api.adorable.io/avatars/100/testeDev.png',
                    }}
                  />
                  <Text style={styles.actorsText}>Fulano Freeman</Text>
                </Col>
                <Col style={styles.colActor}>
                  <Image
                    style={{
                      width: 60,
                      height: 60,
                      borderRadius: 50,
                      marginBottom: 5,
                    }}
                    source={{
                      uri: 'https://api.adorable.io/avatars/100/testeDev.png',
                    }}
                  />
                  <Text style={styles.actorsText}>Fulano Rock</Text>
                </Col>
                <Col style={styles.colActor}>
                  <Image
                    style={{
                      width: 60,
                      height: 60,
                      borderRadius: 50,
                      marginBottom: 5,
                    }}
                    source={{
                      uri: 'https://api.adorable.io/avatars/100/testeDev.png',
                    }}
                  />
                  <Text style={styles.actorsText}>Fulano Sheen</Text>
                </Col>
              </Row>
              <Row>
                <Col>
                  <Row>
                    <Col style={{width: '15%'}}>
                      <Text style={{color: 'white', fontWeight: 'bold'}}>
                        Estudio
                      </Text>
                    </Col>
                    <Col>
                      <Text style={{color: '#c6c6c6', fontWeight: 'bold'}}>
                        informação indisponível
                      </Text>
                    </Col>
                  </Row>
                  <Row>
                    <Col style={{width: '15%'}}>
                      <Text style={{color: 'white', fontWeight: 'bold'}}>
                        Gênero
                      </Text>
                    </Col>
                    <Col>
                      <Text style={{color: '#c6c6c6', fontWeight: 'bold'}}>
                        {this.props.genres}
                      </Text>
                    </Col>
                  </Row>
                  <Row>
                    <Col style={{width: '15%'}}>
                      <Text style={{color: 'white', fontWeight: 'bold'}}>
                        Ano
                      </Text>
                    </Col>
                    <Col>
                      <Text style={{color: '#c6c6c6', fontWeight: 'bold'}}>
                        {this.props.movie.release_date.split('-')[0]}
                      </Text>
                    </Col>
                  </Row>
                </Col>
              </Row>
            </ScrollView>
          </Row>
        </Grid>
      </Container>
    );
  }
}
const mapStateToProps = state => ({
  movie: state.Details.movie,
  genres: state.Search.genres,
});
const mapDispatchToProps = {loadGenres};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Details);
