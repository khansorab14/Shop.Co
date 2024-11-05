
import PropTypes from "prop-types";

export const ViewAllBtn = ({ handleToggleShowAll, showAll }) => {
  return (
    <div className="text-center mt-5 py-20">
      <button
        onClick={handleToggleShowAll}
        className="bg-white rounded-full text-black border-[1px] text-s w-52 px-8 py-4"
      >
        {showAll ? "Show Less" : "View All"}
      </button>
    </div>
  );
};

ViewAllBtn.propTypes = {
  handleToggleShowAll: PropTypes.func.isRequired,
  showAll: PropTypes.bool.isRequired,
};
