import React, { useContext, useEffect, useState } from 'react';
// import load from '../../assets/Spinner-1s-200px.svg'
import { Outlet, useNavigate } from 'react-router-dom';

import { useSelector } from 'react-redux';
// import type { User, UserId } from './types';
import ServerItem from './ServerItem';
import FormAddServer from './FormAddServer';
// import { appContext } from '../../context';
import NavBar from '../nav/NavBar';

import { useAppDispatch, type RootState } from '../../redux/store';
import './styles/server.scss';
import type { FilterParams, Server } from './types';
import {
  loadServers,
  setFilterParams,
  setTopServersFilter,
  switchToEnglish,
  switchToRussian,
} from './serversSlice';

const ServersListPage = (): JSX.Element => {
  const dispatch = useAppDispatch();

  const servers = useSelector((state: RootState) => state.servers.servers);
  const gaed = useSelector((state: RootState) => state.servers.filteredServers);
  const user = useSelector((state: RootState) => state.auth.auth);
  const selectedLanguage = useSelector((state: RootState) => state.servers.selectedLanguage);
  console.log(selectedLanguage);

  const [filteredServers, setServers] = useState<Server[]>(servers);

  // Загружаем servers при монтировании компонента
  useEffect(() => {
    setServers(servers);
  }, [servers]); //

  useEffect(() => {
    setServers(gaed);
  }, [gaed]); //

  // const handlePlus = (key: keyof Server,stro:string, value: string): void => {
  //   dispatch(setFilterParams({ key,stro, value }));

  //   dispatch(setTopServersFilter());
  // };

  const today = new Date();

  const sevenDaysLater = new Date();
  sevenDaysLater.setDate(today.getDate() + 8);
  const sevenDaysPrevious = new Date();
  sevenDaysPrevious.setDate(today.getDate() - 9);
  const tomorrow = new Date();
  tomorrow.setDate(today.getDate() + 1);
  const yesterday = new Date();
  yesterday.setDate(today.getDate() - 1);
  const beforeYesterday = new Date();
  beforeYesterday.setDate(today.getDate() - 2);

  const seg = today.toLocaleDateString();
  const zav = tomorrow.toLocaleDateString();
  const vche = yesterday.toLocaleDateString();

  const serversOpeningSoon = filteredServers.filter((server) => {
    const openAtDate = new Date(server.openAt);
    return openAtDate >= today && openAtDate <= sevenDaysLater;
  });
  const sevenDaysPreviousOpen = filteredServers.filter((server) => {
    const openAtDate = new Date(server.openAt);
    return openAtDate < yesterday && openAtDate >= sevenDaysPrevious;
  });
  const WeekOrMore = filteredServers.filter((server) => {
    const openAtDate = new Date(server.openAt);
    return openAtDate >= today && openAtDate > sevenDaysLater;
  });
  const WeekOrMorePrev = filteredServers.filter((server) => {
    const openAtDate = new Date(server.openAt);
    return openAtDate < yesterday && openAtDate < sevenDaysPrevious;
  });
  const todayOpen = filteredServers.filter((server) => {
    const openAtDate = new Date(server.openAt);
    return openAtDate > yesterday && openAtDate < today;
  });
  const tomorrowOpen = filteredServers.filter((server) => {
    const openAtDate = new Date(server.openAt);
    return openAtDate >= today && openAtDate < tomorrow;
  });
  const alreadyOpened = filteredServers.filter((server) => {
    const openAtDate = new Date(server.openAt);
    return openAtDate < yesterday && server.desc === 'TOP';
  });
  const soonOpen = filteredServers.filter((server) => {
    const openAtDate = new Date(server.openAt);
    return server.desc === 'TOP' && openAtDate > yesterday;
  });
  const yesterdayOpen = filteredServers.filter((server) => {
    const openAtDate = new Date(server.openAt);
    return openAtDate > beforeYesterday && openAtDate < yesterday;
  });
  const stringYesterdayOpen = yesterdayOpen.map((obj) => ({
    ...obj,
    openAt: '  Вчера',
  }));

  const stringTodayOpen = todayOpen.map((obj) => ({
    ...obj,
    openAt: '  Сегодня',
  }));
  const stringTomorrowOpen = tomorrowOpen.map((obj) => ({
    ...obj,
    openAt: '  Завтра',
  }));

  const [isLightOn, setIsLightOn] = useState(false);

  // const handleLightClick = ():void => {
  //   setIsLightOn(!isLightOn);
  // };
  const [isActive, setIsActive] = useState(false);

  // const toggleMenu = () => {
  //   setIsActive(!isActive);
  // };

  return (
    <>
      {user ? <FormAddServer /> : ''}
      <div className="bigbigContainer">
        <div className="immaCon">
          <img className="immaL2" src="/L4.jpg" alt="" />
        </div>
        <div className="serContainer">
          <div className="micro">
            <div className="micromicro">
              <a title="Новые сервера L2" href="/">
                <img src="/L2MOB2.png" alt="Новые сервера L2" />
              </a>
            </div>
          </div>
          <div className="minContainer">
            {' '}
            {selectedLanguage === 'en' ? (
              <h2>LINEAGE 2 SERVERS</h2>
            ) : (
              <h2>АНОНСЫ СЕРВЕРОВ LINEAGE 2</h2>
            )}
            <div className="langLig">
              <div>
                <button className="btnLig" type="button" onClick={() => setIsLightOn(!isLightOn)}>
                  <svg
                    width="25px"
                    height="25px"
                    viewBox="0 0 1024 1024"
                    className="icon"
                    version="1.1"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M698.89024 327.455744l95.22688-164.937728c-65.600512-37.875712-167.247872-96.561152-220.664832-4.040704l-87.007232 150.70208c-50.029568 86.653952 26.125312 130.622464 117.21728 183.21408l95.227904-164.937728zM424.27904 929.600512h190.45376c0-105.18528-85.269504-190.45376-190.45376-190.45376-105.18528 0-190.454784 85.26848-190.454784 190.45376h190.45376zM242.748416 539.049984l200.095744 200.095744-200.095744-200.095744-7.46496 10.876928 7.46496-10.876928z m168.85248-246.028288L242.748416 539.049984l-48.18944-48.187392 48.18944 48.187392 168.85248-246.028288a141.133824 141.133824 0 0 0 13.284352 8.69888l50.439168 29.120512 107.826176-186.760192-50.439168-29.121536c-66.59072-38.44608-152.013824-15.584256-190.569472 51.195904l31.7952-55.07072c-35.934208 62.239744-18.63168 140.353536 37.66272 181.937152z"
                      fill="#FFF200"
                    />
                    <path
                      d="M753.379328 463.576064c-16.425984 0-33.056768-4.173824-48.275456-12.959744-9.79456-5.655552-13.151232-18.18112-7.49568-27.97568 5.655552-9.796608 18.18112-13.15328 27.97568-7.49568 12.935168 7.465984 28.003328 9.45152 42.42944 5.584896 14.427136-3.8656 26.484736-13.11744 33.952768-26.052608 15.415296-26.7008 6.234112-60.964864-20.466688-76.38016-9.795584-5.656576-13.151232-18.18112-7.49568-27.97568 5.654528-9.797632 18.180096-13.155328 27.97568-7.497728 46.260224 26.708992 62.16704 86.074368 35.458048 132.333568-17.922048 31.04256-50.55488 48.418816-84.058112 48.418816zM423.77216 276.55168a120.988672 120.988672 0 0 0 11.354112 7.43424l31.69792 18.299904a182.54848 182.54848 0 0 1 1.88416-3.345408l85.4272-147.96288-31.664128-18.280448c-27.476992-15.864832-59.528192-20.062208-90.249216-11.81696-20.21376 5.42208-38.24128 15.803392-52.74112 30.1056-12.017664 46.04416 4.447232 96.135168 44.288 125.563904l0.003072 0.002048z m72.706048 58.611712c-12.176384 30.826496-1.50528 50.136064 11.250688 65.122304 18.868224 22.167552 51.912704 42.797056 88.45312 64.10752l84.97152-147.176448 84.953088-147.141632c-28.2368-15.93344-60.464128-32.467968-90.8032-38.372352-33.020928-6.426624-56.675328 0.764928-74.78272 23.25504L496.478208 335.161344z m-240.9472 573.958144h337.49504c-10.141696-84.107264-81.95072-149.49376-168.747008-149.49376s-158.60736 65.386496-168.748032 149.49376z m359.201792 40.96H233.824256c-11.311104 0-20.48-9.16992-20.48-20.48 0-106.50624 79.345664-194.828288 182.030336-208.961536L243.447808 568.712192c-6.253568 2.710528-13.718528 2.24256-19.753984-1.89952-5.782528-3.969024-8.891392-10.37824-8.892416-16.900096a20.35712 20.35712 0 0 1 1.695744-8.150016L180.078592 505.344A20.41856 20.41856 0 0 1 174.08 490.861568a20.417536 20.417536 0 0 1 5.998592-14.481408c7.99744-7.996416 20.965376-7.996416 28.962816 0l30.765056 30.765056 144.407552-210.41152c-31.236096-29.678592-48.40448-70.05184-49.50016-111.490048a20.548608 20.548608 0 0 1-2.81088-1.35168c-9.795584-5.655552-13.151232-18.18112-7.49568-27.97568l31.794176-55.07072c5.655552-9.796608 18.18112-13.15328 27.97568-7.49568a20.66432 20.66432 0 0 1 2.608128 1.78176c10.898432-5.876736 22.560768-10.523648 34.82112-13.81376 41.2928-11.07968 84.38784-5.43232 121.344 15.904768l36.02432 20.798464c10.369024-9.966592 22.045696-17.458176 34.944-22.396928 20.21888-7.74144 43.503616-9.129984 69.210112-4.12672 43.650048 8.49408 86.665216 33.328128 121.228288 53.28384 9.795584 5.655552 13.151232 18.18112 7.49568 27.976704L716.62592 337.695744l-17.73568-10.24 17.73568 10.24-95.22688 164.938752a20.48 20.48 0 0 1-27.97568 7.49568c-46.49984-26.847232-90.421248-52.20352-116.885504-83.296256-22.356992-26.2656-30.496768-54.974464-24.395776-85.72928l-34.880512-20.137984-147.995648 215.638016 184.05376 184.05376c102.614016 14.194688 181.89312 102.486016 181.89312 208.94208 0 11.31008-9.168896 20.48-20.48 20.48z"
                      fill="#000000"
                    />
                  </svg>
                  {}
                </button>
              </div>
              <div className="lang">
                <button
                  className="btnLang"
                  type="button"
                  onClick={() => dispatch(switchToRussian())}
                >
                  РУ
                </button>
                <button
                  className="btnLang"
                  type="button"
                  onClick={() => dispatch(switchToEnglish())}
                >
                  EN
                </button>
              </div>
              <button
                type="button"
                onClick={() => setIsActive(!isActive)}
                className={`burger-menu ${isActive ? 'active' : ''}`}
              >
                <div>{} </div>
                <div> {}</div>
                <div> {}</div>
              </button>
              {isActive && (
                <div className="hidden-component">
                  <NavBar />
                </div>
              )}
            </div>
          </div>
          <div
            className="bigContainer"
            style={{ backgroundColor: isLightOn ? 'white' : 'rgb(30 28 47)' }}
          >
            <div className="oneContainer">
              <div className="mapServers">
                {soonOpen.length > 0 ? (
                  <>
                    {selectedLanguage === 'en' ? (
                      <h2 style={{ color: isLightOn ? 'black' : 'white' }}>COMING SOON SERVERS</h2>
                    ) : (
                      <h2 style={{ color: isLightOn ? 'black' : 'white' }}>СКОРО ОТКРОЮТСЯ </h2>
                    )}
                    <ul>
                      {soonOpen.map((server) => (
                        <ServerItem key={server.id} server={server} />
                      ))}
                    </ul>
                  </>
                ) : (
                  ''
                )}
              </div>

              <div className="mapServers">
                {stringTodayOpen.length > 0 ? (
                  <>
                    {selectedLanguage === 'en' ? (
                      <h2 style={{ color: isLightOn ? 'black' : 'white' }}> TODAY </h2>
                    ) : (
                      <h2 style={{ color: isLightOn ? 'black' : 'white' }}> СЕГОДНЯ </h2>
                    )}

                    <h4 style={{ color: isLightOn ? 'black' : 'white' }}>{seg} </h4>
                    <ul>
                      {stringTodayOpen.map((server) => (
                        <ServerItem key={server.id} server={server} />
                      ))}
                    </ul>
                  </>
                ) : (
                  ''
                )}
              </div>

              <div className="mapServers">
                {stringTomorrowOpen.length > 0 ? (
                  <>
                    {selectedLanguage === 'en' ? (
                      <h2 style={{ color: isLightOn ? 'black' : 'white' }}> TOMORROW </h2>
                    ) : (
                      <h2 style={{ color: isLightOn ? 'black' : 'white' }}> ЗАВТРА </h2>
                    )}

                    <h4 style={{ color: isLightOn ? 'black' : 'white' }}>{zav} </h4>
                    <ul>
                      {stringTomorrowOpen.map((server) => (
                        <ServerItem key={server.id} server={server} />
                      ))}
                    </ul>
                  </>
                ) : (
                  ''
                )}
              </div>
              <div className="mapServers">
                {serversOpeningSoon.length > 0 ? (
                  <>
                    {selectedLanguage === 'en' ? (
                      <h2 style={{ color: isLightOn ? 'black' : 'white' }}> NEXT 7 DAYS </h2>
                    ) : (
                      <h2 style={{ color: isLightOn ? 'black' : 'white' }}> БЛИЖАЙШИЕ 7 ДНЕЙ </h2>
                    )}
                    <ul>
                      {serversOpeningSoon.map((server) => (
                        <ServerItem key={server.id} server={server} />
                      ))}
                    </ul>
                  </>
                ) : (
                  ''
                )}
              </div>

              <div className="mapServers">
                {WeekOrMore.length > 0 ? (
                  <>
                    {selectedLanguage === 'en' ? (
                      <h2 style={{ color: isLightOn ? 'black' : 'white' }}>
                        {' '}
                        AFTER WEEK AND MORE{' '}
                      </h2>
                    ) : (
                      <h2 style={{ color: isLightOn ? 'black' : 'white' }}>
                        {' '}
                        ЧЕРЕЗ НЕДЕЛЮ И БОЛЕЕ{' '}
                      </h2>
                    )}
                    <ul>
                      {WeekOrMore.map((server) => (
                        <ServerItem key={server.id} server={server} />
                      ))}
                    </ul>
                  </>
                ) : (
                  ''
                )}
              </div>
            </div>{' '}
            <div className="tooContainer">
              <div className="mapServers">
                {alreadyOpened.length > 0 ? (
                  <>
                    {selectedLanguage === 'en' ? (
                      <h2 style={{ color: isLightOn ? 'black' : 'white' }}> ALREADY OPENED</h2>
                    ) : (
                      <h2 style={{ color: isLightOn ? 'black' : 'white' }}> УЖЕ ОТКРЫЛИСЬ</h2>
                    )}
                    <ul>
                      {alreadyOpened.map((server) => (
                        <ServerItem key={server.id} server={server} />
                      ))}
                    </ul>
                  </>
                ) : (
                  ''
                )}
              </div>

              <div className="mapServers">
                {stringYesterdayOpen.length > 0 ? (
                  <>
                    {selectedLanguage === 'en' ? (
                      <h2 style={{ color: isLightOn ? 'black' : 'white' }}>YESTERDAY</h2>
                    ) : (
                      <h2 style={{ color: isLightOn ? 'black' : 'white' }}>ВЧЕРА</h2>
                    )}
                    <h4>{vche}</h4>
                    <ul>
                      {stringYesterdayOpen.map((server) => (
                        <ServerItem key={server.id} server={server} />
                      ))}
                    </ul>
                  </>
                ) : (
                  ''
                )}
              </div>
              <div className="mapServers">
                {sevenDaysPreviousOpen.length > 0 ? (
                  <>
                    {selectedLanguage === 'en' ? (
                      <h2 style={{ color: isLightOn ? 'black' : 'white' }}>PREVIOUS 7 DAYS</h2>
                    ) : (
                      <h2 style={{ color: isLightOn ? 'black' : 'white' }}>ПРЕДЫДУЩИЕ 7 ДНЕЙ</h2>
                    )}
                    <ul>
                      {sevenDaysPreviousOpen.map((server) => (
                        <ServerItem key={server.id} server={server} />
                      ))}
                    </ul>
                  </>
                ) : (
                  ''
                )}
              </div>
              <div className="mapServers">
                {WeekOrMorePrev.length > 0 ? (
                  <>
                    {selectedLanguage === 'en' ? (
                      <h2 style={{ color: isLightOn ? 'black' : 'white' }}>WEEK AGO AND MORE</h2>
                    ) : (
                      <h2 style={{ color: isLightOn ? 'black' : 'white' }}>НЕДЕЛЮ НАЗАД И БОЛЕЕ</h2>
                    )}
                    <ul>
                      {WeekOrMorePrev.map((server) => (
                        <ServerItem key={server.id} server={server} />
                      ))}
                    </ul>
                  </>
                ) : (
                  ''
                )}
              </div>
            </div>
            <div className="navi">
              <NavBar />
            </div>
          </div>
        </div>{' '}
        <div className="info">
          {selectedLanguage === 'en' ? (
            <>
              <h3>LIST OF ALL NEW L2 SERVERS</h3>

              <p>
              The cost of advertising starts from 4 dollars/month
              </p>
              <p>
                Premium L2 servers, that are coming soon or recently opened. Don't miss opening of
                new L2 servers today!
              </p>
              <p>
                Here are the highest-quality projects. Servers with star icon "Premium server" have
                long advertising campaign. Starting to play on such projects you can be sure in
                their stability and good online.
              </p>
              <p>
                All new Lineage 2 private servers are placed in the list, which we update daily,
                providing the latest information about new openings. A convenient search engine will
                allow you to find a project suitable for you in a few seconds. Lineage2 servers,
                which are mounting to the top are the best L2 servers
              </p>
              <p>
                We place only basic information: link to the project, rates, chronicles and opening
                date. Detailed information of each server L2 can be found on their sites. There you
                can find instructions for entering the game.
              </p>
              <p>
                On our site you can find such servers as: PvP, low rate, GvE, RvR, MultiCraft,
                MultiSkill, classic version of the game and with customs. Stay with us and you will
                be informed of all new Lineage II servers.
              </p>
              <h3>ADVERTISING</h3>
            </>
          ) : (
            <>
              <h3>НОВЫЕ СЕРВЕРА Л2 С БОЛЬШИМ ОНЛАЙНОМ</h3>
              <p>Стоимость рекламы  от 300 рублей/месяц</p>
              <p>
                Анонсы серверов Lineage 2 всех рейтов и хроник. Не пропустите открытие серверов л2
                уже сегодня!
              </p>
              <p>
                Здесь размещаются наиболее качественные проекты. Вверху списка закреплены Премиум
                сервера L2. Начиная играть на таком проекте вы можете{' '}
              быть уверены в его стабильности и хорошем онлайне.</p>
              <p>
                Для удобства все новые сервера Lineage 2 составлены в список, который мы ежедневно
                актуализируем, добавляя в него самую последнюю
              
                информацию о новых открытиях. Удобный поисковый механизм позволит за несколько
                секунд найти подходящий вам проект. Анонсы серверов
              
                л2, закрепленные сверху, а так же те, которые имеют синий текст сервера, являются
                лучшими игровыми проектами на сегодняшний день.
              </p>
              <p>
                Мы размещаем только основную информацию - это ссылка на проект, рейты, хроники и
                дата старта. С подробным описанием каждого сервера{' '}
              
                Линейдж 2 можно ознакомиться, перейдя на один из них. Там же можно найти и
                инструкции для входа в игру.
              </p>
              <p>
                На нашем сайте вы сможете найти сервера ла2 различных концепций, таких как: PvP,
                крафт, low rate, GvE, RvR, пвп-крафт, мультикрафт,
              мультипрофа, классической версии игры и с дополнениями.</p>
              <p>Оставайтесь с нами и вы будете в курсе новых открытий!</p>
              <h3>ИНФОРМАЦИЯ</h3>
            </>
          )}

          <div className="sil" style={{ display: 'flex', padding: '10px', marginBottom: '30px' }}>
            <a href="https://vk.com/pakubatake">
              <img src="/vkontakte.png" alt="VK" /> VK
            </a>
            <a
              href="https://discordapp.com/users/266694378712596481"
              style={{ marginLeft: '30px' }}
            >
              <img style={{ height: '50px', width: 'auto' }} src="/dis2" alt="DISCORD" />
              DISCORD{' '}
            </a>
          </div>
        </div>
      </div>
    </>
  );
};

export default ServersListPage;
