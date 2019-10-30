import React from 'react';
import {Image, TouchableOpacity} from 'react-native';
import {Grid, Row, Col, Text} from 'native-base';
import StarRating from 'react-native-star-rating';
import styles from './styles';
import {setMovie} from '../../ducks/details';
import {connect} from 'react-redux';
import {Actions} from 'react-native-router-flux';
const MovieCard = props => {
  return (
    <>
      {props.data && props.data.title ? (
        <Grid>
          <Col style={{padding: 10, width: 120}}>
            <TouchableOpacity
              onPress={() => {
                props.setMovie(props.data);
                Actions.details();
              }}>
              <Image
                style={{width: 110, height: 150, borderRadius: 10}}
                source={{
                  uri:
                    'https://image.tmdb.org/t/p/w500/' +
                    props.data.backdrop_path,
                }}
              />
            </TouchableOpacity>
            <Text
              style={{
                flex: 1,
                flexShrink: 1,
                color: 'white',
                fontSize: 14,
                flexWrap: 'wrap',
              }}>
              {props.data.title}
            </Text>
            <Row>
              <StarRating
                disabled
                maxStars={5}
                rating={(props.data.vote_average / 10) * 5}
                starSize={16}
                fullStarColor="yellow"
                emptyStarColor="#ddd363"
              />
            </Row>
          </Col>
        </Grid>
      ) : (
        <Grid>
          <Col style={{padding: 10}}>
            <Text>
              Não foram encontrados filmes para listar nesta categoria
            </Text>
          </Col>
        </Grid>
      )}
    </>
  );
};
const mapStateToProps = state => ({});
const mapDispatchToProps = {setMovie};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(MovieCard);
