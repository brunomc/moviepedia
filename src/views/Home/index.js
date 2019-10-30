import React, {Component} from 'react';
import {View, FlatList, ScrollView, TouchableOpacity} from 'react-native';
import {Grid, Row, Col, Text, Container, Item, Input, Icon} from 'native-base';
import styles from './styles';
import MovieCard from '../../components/MovieCard';
import {loadListMovies, search, setSearchInput} from '../../ducks/search';
import {connect} from 'react-redux';

class Home extends Component {
  state = {
    category: 'none',
  };
  componentDidMount() {
    this.props.loadListMovies('now_playing');
    this.props.loadListMovies('top_rated');
    this.props.loadListMovies('upcoming');
    this.props.loadListMovies('popular');
  }
  seeAll(category) {
    this.setState({
      category,
    });
  }
  renderNowPlaying() {
    return (
      <>
        <Row size={10} style={styles.rowSubtitle}>
          <Text style={styles.subtitle}>Em cartaz</Text>
          <TouchableOpacity onPress={() => this.seeAll('now_playing')}>
            <Text style={styles.seeAll}>Ver todos</Text>
          </TouchableOpacity>
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
      </>
    );
  }
  renderPopular() {
    return (
      <>
        <Row size={10} style={styles.rowSubtitle}>
          <Text style={styles.subtitle}>Populares</Text>
          <TouchableOpacity onPress={() => this.seeAll('popular')}>
            <Text style={styles.seeAll}>Ver todos</Text>
          </TouchableOpacity>
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
      </>
    );
  }
  renderTopRated() {
    return (
      <>
        <Row size={10} style={styles.rowSubtitle}>
          <Text style={styles.subtitle}>Melhores avaliados</Text>
          <TouchableOpacity onPress={() => this.seeAll('top_rated')}>
            <Text style={styles.seeAll}>Ver todos</Text>
          </TouchableOpacity>
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
      </>
    );
  }
  renderUpComing() {
    return (
      <>
        <Row size={10} style={styles.rowSubtitle}>
          <Text style={styles.subtitle}>Em Breve</Text>
          <TouchableOpacity onPress={() => this.seeAll('upcoming')}>
            <Text style={styles.seeAll}>Ver todos</Text>
          </TouchableOpacity>
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
    );
  }
  renderVerticalList(data) {
    return (
      <>
        <Row size={10} style={styles.rowSubtitle}>
          <Text style={styles.subtitle}>Todos</Text>
          <TouchableOpacity onPress={() => this.seeAll('none')}>
            <Text style={styles.subtitle}>Ver por categorias</Text>
          </TouchableOpacity>
        </Row>
        <Row>
          <Col style={{justifyContent: 'center', alignItems: 'center'}}>
            {data.map(movie => {
              return <MovieCard data={movie} />;
            })}
          </Col>
        </Row>
      </>
    );
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
              ) : this.state.category !== 'none' ? (
                this.state.category == 'now_playing' ? (
                  this.renderVerticalList(this.props.moviesNowPlaying)
                ) : this.state.category == 'top_rated' ? (
                  this.renderVerticalList(this.props.moviesTopRated)
                ) : this.state.category == 'popular' ? (
                  this.renderVerticalList(this.props.moviesPopular)
                ) : this.state.category == 'upcoming' ? (
                  this.renderVerticalList(this.props.moviesUpComing)
                ) : (
                  <></>
                )
              ) : (
                <>
                  {this.renderNowPlaying()}
                  {this.renderPopular()}
                  {this.renderTopRated()}
                  {this.renderUpComing()}
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
