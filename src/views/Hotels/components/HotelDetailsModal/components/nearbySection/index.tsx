import GoogleMap from '@/components/common/custom/GoogleMap';
import styles from './index.module.css';
const NearbySection = (props:hotelDetails) => {
  const{location,address ,city}=props
  return (
    <div className={styles.container}>
      <h2 className={styles.heading}>{city.name}</h2>
      <GoogleMap
        variant="location"
        coordinate={{ lat: location.coordinates[1], lng: location.coordinates[0] }}
        zoom={18}
        className={styles.map}
      />
      <p>{address}</p>
      {/* <div className={styles.descriptionContainer}>
        <h3>Whats neearby</h3>
        <div>
          <p>
            Vaugirard Paris Metro 3 min walk Convention Metro Station 9 min walk
            La Motte Picquet Grenelle Metro Station13 min walk Hôpital
            Necker-Enfants malades15 min walk École Militaire17 min walk Musee
            de la Poste18 min walk
          </p>
          <p>
            Vaugirard Paris Metro 3 min walk Convention Metro Station 9 min walk
            La Motte Picquet Grenelle Metro Station13 min walk Hôpital
            Necker-Enfants malades15 min walk École Militaire17 min walk Musee
            de la Poste18 min walk
          </p>
        </div>
      </div> */}
    </div>
  );
};

export default NearbySection;
