import style from "./carList.module.css";
import CarCard from "./CarCard";
import BrandFilter from "./BrandFilter";
import CountryFilter from "./CountryFilter";

export default function CarList({
  auction,
  country,
}: {
  auction: string;
  country: string;
}) {
  return (
    <div className={style.carList}>
      <CountryFilter />

      <div className={style.main}>
        <BrandFilter country="all" />

        {/* 차량 리스트 */}
        <div className={style.carListSection}>
          <div className={style.listFilter}>
            <p className={style.filterOption}>마감임박순</p>
          </div>

          <div className={style.carListContainer}>
            {auction === "dealer" && (
              <>
                <CarCard type="deadline" />
                <CarCard type="deadline" />
                <CarCard type="deadline" />
                <CarCard type="deadline" />
              </>
            )}
            {auction === "capital" && (
              <>
                <CarCard type="promotion" />
                <CarCard type="promotion" />
                <CarCard type="promotion" />
                <CarCard type="promotion" />
              </>
            )}
            {auction === "user" && (
              <>
                <CarCard type="top" />
                <CarCard type="top" />
                <CarCard type="top" />
                <CarCard type="top" />
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
