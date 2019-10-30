import React, {Component} from 'react';
import {View, FlatList, ScrollView} from 'react-native';
import {Grid, Row, Col, Text, Container, Item, Input, Icon} from 'native-base';
import styles from './styles';
import MovieCard from '../../components/MovieCard';
import {loadListMovies, search, setSearchInput} from '../../ducks/search';
import {connect} from 'react-redux';
import {statements} from '@babel/template';

class Home extends Component {
  componentDidMount() {
    this.props.loadListMovies('now_playing');
    this.props.loadListMovies('top_rated');
    this.props.loadListMovies('upcoming');
    this.props.loadListMovies('popular');
  }
  render() {
    return (
      <Container style={styles.container}>
        <Grid>
          <Row size={30} style={styles.header}>
            <Row size={60}>
              <View style={styles.titleRow}>
                <Text style={styles.titleHeader}>
                  Olá, o que você quer assistir?
                </Text>
              </View>
            </Row>
            <Row size={70}>
              <Item rounded style={styles.itemInputSearch}>
                <Icon name="search" style={{color: 'white'}} />
                <Input
                  placeholder="Buscar"
                  placeholderTextColor="white"
                  onChangeText={e => {
                    this.props.setSearchInput(e);
                  }}
                  onSubmitEditing={() =>
                    this.props.search(this.props.searchInput)
                  }
                />
              </Item>
            </Row>
          </Row>
          <Row size={80} style={styles.bodyContainer}>
            <ScrollView>
              {this.props.movies.length > 0 && this.props.searchInput !== '' ? (
                <>
                  <Row size={10} style={styles.rowSubtitle}>
                    <Text style={styles.subtitle}>Resultado da busca</Text>
                    <Text style={styles.seeAll}>Ver todos</Text>
                  </Row>
                  <Row size={90}>
                    <FlatList
                      style={styles.videos_flatList}
                      horizontal={true}
                      data={this.props.movies}
                      renderItem={({item}) => <MovieCard data={item} />}
                      ItemSeparatorComponent={() => {
                        return (
                          <View
                            style={{
                              height: '100%',
                            }}
                          />
                        );
                      }}
                      keyExtractor={(item, index) => index.toString()}
                    />
                  </Row>
                </>
              ) : (
                <>
                  <Row size={10} style={styles.rowSubtitle}>
                    <Text style={styles.subtitle}>Em cartaz</Text>
                    <Text style={styles.seeAll}>Ver todos</Text>
                  </Row>
                  <Row size={90}>
                    <FlatList
                      style={styles.videos_flatList}
                      horizontal={true}
                      data={this.props.moviesNowPlaying}
                      renderItem={({item}) => <MovieCard data={item} />}
                      ItemSeparatorComponent={() => {
                        return (
                          <View
                            style={{
                              height: '100%',
                            }}
                          />
                        );
                      }}
                      keyExtractor={(item, index) => index.toString()}
                    />
                  </Row>
                  <Row size={10} style={styles.rowSubtitle}>
                    <Text style={styles.subtitle}>Populares</Text>
                    <Text style={styles.seeAll}>Ver todos</Text>
                  </Row>
                  <Row size={90}>
                    <FlatList
                      style={styles.videos_flatList}
                      horizontal={true}
                      data={this.props.moviesPopular}
                      renderItem={({item}) => <MovieCard data={item} />}
                      ItemSeparatorComponent={() => {
                        return (
                          <View
                            style={{
                              height: '100%',
                            }}
                          />
                        );
                      }}
                      keyExtractor={(item, index) => index.toString()}
                    />
                  </Row>
                  <Row size={10} style={styles.rowSubtitle}>
                    <Text style={styles.subtitle}>Melhores avaliados</Text>
                    <Text style={styles.seeAll}>Ver todos</Text>
                  </Row>
                  <Row size={90}>
                    <FlatList
                      style={styles.videos_flatList}
                      horizontal={true}
                      data={this.props.moviesTopRated}
                      renderItem={({item}) => <MovieCard data={item} />}
                      ItemSeparatorComponent={() => {
                        return (
                          <View
                            style={{
                              height: '100%',
                            }}
                          />
                        );
                      }}
                      keyExtractor={(item, index) => index.toString()}
                    />
                  </Row>
                  <Row size={10} style={styles.rowSubtitle}>
                    <Text style={styles.subtitle}>Em Breve</Text>
                    <Text style={styles.seeAll}>Ver todos</Text>
                  </Row>
                  <Row size={90}>
                    <FlatList
                      style={styles.videos_flatList}
                      horizontal={true}
                      data={this.props.moviesUpComing}
                      renderItem={({item}) => <MovieCard data={item} />}
                      ItemSeparatorComponent={() => {
                        return (
                          <View
                            style={{
                              height: '100%',
                            }}
                          />
                        );
                      }}
                      keyExtractor={(item, index) => index.toString()}
                    />
                  </Row>
                </>
              )}
            </ScrollView>
          </Row>
        </Grid>
      </Container>
    );
  }
}
const mapStateToProps = state => ({
  movies: state.Search.movies,
  moviesNowPlaying: state.Search.moviesNowPlaying,
  moviesTopRated: state.Search.moviesTopRated,
  moviesPopular: state.Search.moviesPopular,
  moviesUpComing: state.Search.moviesUpComing,
  searchInput: state.Search.searchInput,
  error: state.Search.error,
});
const mapDispatchToProps = {loadListMovies, search, setSearchInput};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Home);
