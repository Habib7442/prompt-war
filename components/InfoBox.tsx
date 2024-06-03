const InfoBox = ({ title, subtitle, containerStyles, titleStyles }: any) => {
  return (
    <div className={containerStyles}>
      <h2 className={`text-white text-center font-psemibold ${titleStyles}`}>
        {title}
      </h2>
      <h2 className={`text-gray-100 text-sm text-center font-pregular`}>
        {subtitle}
      </h2>
    </div>
  );
};

export default InfoBox;
