import { FC } from "react";
import { Link } from "react-router-dom";

export const TabUser: FC = () => {
  return (
    <div className="tabs tabs-boxed justify-center p-4 gap-4 bg-white text-@Red">
      <Link to="/admin">
        <div className="btn capitalize border-0 tab-lg text-@Red font-semibold rounded-full w-60 bg-@Gray2 hover:bg-@Gray2">
          User
        </div>
      </Link>
      <Link to="/position">
        <div className="btn capitalize border-0 tab-lg text-@Red font-semibold rounded-full w-60 bg-white hover:bg-@Gray2">
          Position
        </div>
      </Link>
      <Link to="/submission-type">
        <div className="btn capitalize border-0 tab-lg text-@Red font-semibold rounded-full w-60 bg-white hover:bg-@Gray2">
          Submission Type
        </div>
      </Link>
      <Link to="/office">
        <div className="btn capitalize border-0 tab-lg text-@Red font-semibold rounded-full w-60 bg-white hover:bg-@Gray2">
          Office
        </div>
      </Link>
    </div>
  );
};

export const TabPosition: FC = () => {
  return (
    <div className="tabs tabs-boxed justify-center p-4 gap-4 bg-white text-@Red">
      <Link to="/admin">
        <div className="btn capitalize border-0 tab-lg text-@Red font-semibold rounded-full w-60 bg-white hover:bg-@Gray2">
          User
        </div>
      </Link>
      <Link to="/position">
        <div className="btn capitalize border-0 tab-lg text-@Red font-semibold rounded-full w-60 bg-@Gray2 hover:bg-@Gray2">
          Position
        </div>
      </Link>
      <Link to="/submission-type">
        <div className="btn capitalize border-0 tab-lg text-@Red font-semibold rounded-full w-60 bg-white hover:bg-@Gray2">
          Submission Type
        </div>
      </Link>
      <Link to="/office">
        <div className="btn capitalize border-0 tab-lg text-@Red font-semibold rounded-full w-60 bg-white hover:bg-@Gray2">
          Office
        </div>
      </Link>
    </div>
  );
};

export const TabSubmisionType: FC = () => {
  return (
    <div className="tabs tabs-boxed justify-center p-4 gap-4 bg-white text-@Red">
      <Link to="/admin">
        <div className="btn capitalize border-0 tab-lg text-@Red font-semibold rounded-full w-60 bg-white hover:bg-@Gray2">
          User
        </div>
      </Link>
      <Link to="/position">
        <div className="btn capitalize border-0 tab-lg text-@Red font-semibold rounded-full w-60 bg-white hover:bg-@Gray2">
          Position
        </div>
      </Link>
      <Link to="/submission-type">
        <div className="btn capitalize border-0 tab-lg text-@Red font-semibold rounded-full w-60 bg-@Gray2 hover:bg-@Gray2">
          Submission Type
        </div>
      </Link>
      <Link to="/office">
        <div className="btn capitalize border-0 tab-lg text-@Red font-semibold rounded-full w-60 bg-white hover:bg-@Gray2">
          Office
        </div>
      </Link>
    </div>
  );
};

export const TabOffice: FC = () => {
  return (
    <div className="tabs tabs-boxed justify-center p-4 gap-4 bg-white text-@Red">
      <Link to="/admin">
        <div className="btn capitalize border-0 tab-lg text-@Red font-semibold rounded-full w-60 bg-white hover:bg-@Gray2">
          User
        </div>
      </Link>
      <Link to="/position">
        <div className="btn capitalize border-0 tab-lg text-@Red font-semibold rounded-full w-60 bg-white hover:bg-@Gray2">
          Position
        </div>
      </Link>
      <Link to="/submission-type">
        <div className="btn capitalize border-0 tab-lg text-@Red font-semibold rounded-full w-60 bg-white hover:bg-@Gray2">
          Submission Type
        </div>
      </Link>
      <Link to="/office">
        <div className="btn capitalize border-0 tab-lg text-@Red font-semibold rounded-full w-60 bg-@Gray2 hover:bg-@Gray2">
          Office
        </div>
      </Link>
    </div>
  );
};
